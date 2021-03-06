
import { debounceTime, filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { SubscriptionLike as ISubscription, Observable, Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage'


import { Component, OnInit, ViewChild, AfterViewInit, Input, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { District, City } from '../../districts/district';
import { Event, EventStatus } from '../event';
import { EventService } from '../event.service';
import { AuthService } from '../../core/auth.service';
import { Bicycle, Image } from '../../bicycle';
import { MyMapComponent } from '../../my-map/my-map.component';
import { GeoLocationService } from '../../geo-location.service';
import { UploadImage } from '../../fileUpload/form-upload/form-upload.component';
import { ConfirmationDialogComponent, DialogData } from './confirmation-dialog.component';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})

export class NewEventFormComponent implements OnInit, AfterViewInit {
  //TODO: Needs REFACTOR    
  @ViewChildren('map')
  public maps: QueryList<MyMapComponent>
  private map: MyMapComponent;

  public isAuthorized: boolean;
  private _defaultLat: number = 38.72529650480368;
  private _defaultLng: number = -9.14989477783206;

  private newEventForm: FormGroup;
  private eventPosition = { lat: this._defaultLat, lng: this._defaultLng };
  private event: Event;
  private event$: ISubscription;
  private images: UploadImage[];
  private marker: google.maps.Marker;
  public eventId: string;
  private isEditing: boolean;
  private showErrorsMessage: boolean;
  private dateValue = new FormControl(new Date());

  constructor(public fb: FormBuilder,
    private eventService: EventService,
    private geo: GeoLocationService,
    private storage: AngularFireStorage,
    public auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.isEditing = this.eventId != null;
    this.isAuthorized = false;
    this.createForm();
    this.images = new Array();
  }

  ngOnInit() {
    // Listen to changes on the "address" field to update the google map
    this.location.valueChanges.pipe(
      filter(txt => txt.length >= 3),
      debounceTime(500), )
      .subscribe(address => this.mapGoToLocation(address));
  }

  ngOnDestroy() {
    if (this.event$) {
      this.event$.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.maps.changes.subscribe((comps: QueryList<MyMapComponent>) => {
      if (comps.first) {
        this.map = comps.first; // Listens when map is ready and inits it
        this.initMap(this.eventPosition.lat, this.eventPosition.lng);
      }
    });

    this.isAuthorized = this.eventId ? false : true; // if doing a new event, user is authorized
    this.changeDetector.detectChanges();
    if (this.isEditing) {
      this.initFilledForm(this.eventId);
    }
    else {
      this.initEmptyForm();
    }
  }

  initFilledForm(eventId: string) { // Inits form with data from the event with the given ID
    this.event$ = this.eventService.getEvent(eventId).subscribe(e => {
      this.event = e;
      this.district.setValue(this.event.district);
      this.isAuthorized = (e.author === this.auth.uid); // authorizes the user if is the author
      this.changeDetector.detectChanges();
      this.eventPosition.lat = this.event.coordinates.latitude;
      this.eventPosition.lng = this.event.coordinates.longitude;
      this.description.setValue(this.event.description);
      this.date.setValue(this.event.date.toDate());
      this.hour.setValue(this.event.hour);
      this.bikeBrand.setValue(this.event.bicycle.brand);
      this.bikeDescription.setValue(this.event.bicycle.description);
      this.bikeSerialNo.setValue(this.event.bicycle.serialNo);
      this.color.setValue(this.event.bicycle.color);
      this.locker.setValue(this.event.lockerType);

      this.images = this.event.bicycle.images ? this.event.bicycle.images.map(img => (
        {
          id: img.id,
          path: img.path,
          name: img.name,
          size: img.size,
          downloadURL: img.downloadURL
        } as UploadImage)) : [];
      this.location.setValue(this.event.location);

      this.city.setValue(this.event.city);
    });
  }

  initEmptyForm() {
    this.date.setValue(new Date()); //init date with today
  }

  // Inits the map on the given coordinates, adds a central marker
  initMap(lat, lng) {
    const center = { lat: lat, lng: lng };
    //TODO: center around user location ?
    this.map.setCenter(center.lat, center.lng);
    this.map.setZoom(13);
    if ( !this.marker ) {
      this.marker = new google.maps.Marker({ position: center, map: this.map.map });
      this.marker.setDraggable(false); // not draggable for now
      // this.marker.addListener('dragend', r => this.handleMarkerDrag(r));
    }
  }

  /**
   * Deletes the current event and the associated images
   */
  delete() {
    this.event$.unsubscribe();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px', //TODO: responsize dialog?
      data: { title: "Tem a certeza que deseja apagar o registo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Delete associated images from storage
      if (result === 'yes') {
        //this.event.bicycle.images.forEach(img => {
        //  this.afStorage.ref(`${img.path}`).delete();
        //});
        // Delete event
        this.eventService.deleteEvent(this.eventId)
          .then(res => {
            this.openSnackBar('Deleted with success', '');
            this.router.navigate(['/events/']);
          })
          .catch(err => { });
      }
    });
  }

  submit() {
    // creates the Object event and submits to the Event Service
    const event: Event = this.getEventFromForm();
    if (!this.newEventForm.valid) {
      this.showErrorsMessage = true;
    } else {
      if (this.isEditing) {
        this.eventService.updateEvent(event).then(res => {
          this.openSnackBar('Edited with success', '');
          this.router.navigate(['/events/' + event.id]);
        }).catch(err => console.error({ err }));
      } else {
        this.eventService.addEvent(event)
          .then(res => {
            this.openSnackBar('Added with success', '');
            this.router.navigate(['/' + res.path]);
          })
          .catch(err => console.error({ err }));
      }
    }


  }

  handleMarkerDrag(marker) {
    this.geo.getAddressFromCoordinates(marker.latLng).subscribe(addresses => {
      this.location.setValue(addresses[0].formatted_address.split(',')[0], { emitEvent: false });
    });
  }

  // Centers the map and marker on a given address
  mapGoToLocation(address: string) {
    var searchAddress = this.location.value;
    if (this.city && this.city.value && this.city.value.name)
      searchAddress = searchAddress.concat(',' + this.city.value.name);

    if (this.district && this.district.value && this.district.value.name)
      searchAddress = searchAddress.concat(',' + this.district.value.name);
    if (searchAddress.length > 3) {
      this.geo.getCoordinates(searchAddress).subscribe(coords => {
        this.marker.setPosition(coords);
        this.map.setCenter(coords.lat, coords.lng);
      },
        err => console.log(err)); // TODO: handle error
    }
  }

  /**
   * Returns an Event object based on the form data
   */
  getEventFromForm(): Event {
    var event: Event = {
      description: this.description.value,
      district: this.district.value,
      city: this.city.value,
      location: this.location.value,
      date: new Date(this.date.value),
      dateCreated: new Date(),
      author: this.auth.uid,
      lockerType: this.locker.value,
      hour: this.hour.value,
      views: 0,
      comments: [],
      coordinates: new firebase.firestore.GeoPoint(this.marker.getPosition().lat(),
        this.marker.getPosition().lng()),
      bicycle: ({
        color: this.color.value,
        serialNo: this.bikeSerialNo.value,
        brand: this.bikeBrand.value,
        description: this.bikeDescription.value,
        images: this.images ? this.images.map(img => ({
          id: img.id,
          path: img.path,
          name: img.name,
          size: img.size,
          downloadURL: img.downloadURL
        } as Image)) : [],
      } as Bicycle),
    } as Event;
    if (this.eventId) {
      event.id = this.eventId;
    }
    return event;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Creates the form
  createForm() {

    this.newEventForm = this.fb.group({
      description: new FormControl('', []),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      bikeBrand: new FormControl('', [Validators.required, Validators.minLength(3)]),
      bikeSerialNo: new FormControl('', []),
      bikeDescription: new FormControl('', []),
      district: new FormControl(undefined, [Validators.required]),
      city: new FormControl(undefined, [Validators.required]),
      locker: new FormControl(undefined, [Validators.required]),
      color: new FormControl(undefined, [Validators.required]),
      hour: new FormControl(undefined, [Validators.required]),
    });
  }

  districtChanged(e) {
    this.city.setValue(undefined);
    this.mapGoToLocation('');
  }

  cityChanged(e) {
    this.mapGoToLocation('');
  }

  // Form fields getters
  get description() { return this.newEventForm.get('description'); }
  get location() { return this.newEventForm.get('location'); }
  get date() { return this.newEventForm.get('date'); }
  get bikeBrand() { return this.newEventForm.get('bikeBrand'); }
  get bikeSerialNo() { return this.newEventForm.get('bikeSerialNo'); }
  get bikeDescription() { return this.newEventForm.get('bikeDescription'); }
  get district() { return this.newEventForm.get('district'); }
  get city() { return this.newEventForm.get('city'); }
  get locker() { return this.newEventForm.get('locker'); }
  get color() { return this.newEventForm.get('color'); }
  get hour() { return this.newEventForm.get('hour'); }



}
