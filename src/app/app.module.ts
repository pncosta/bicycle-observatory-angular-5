/* Angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
// import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';

/* 3rd party Components */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WavesModule, ButtonsModule } from 'angular-bootstrap-md'

/* MyApp Modules and Services */
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
/* import { InMemoryDataService } from './in-memory-data.service'; */
import { EventService } from './events/event.service';
import { UploadFileService } from './fileUpload/upload-file.service';
import { GeoLocationService  } from './geo-location.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

/* MyApp Components */
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginDialog } from './navbar/login-dialog.component';
import { SignupDialogComponent } from './navbar/signup-dialog.component';
import { GoogleLoginButtonComponent } from './navbar/google-login-button/google-login-button.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { NewEventFormComponent } from './events/new-event-form/new-event-form.component';
import { ConfirmationDialogComponent } from './events/new-event-form/confirmation-dialog.component';
import { MyMapComponent } from './my-map/my-map.component';
import { FormUploadComponent } from './fileUpload/form-upload/form-upload.component';
import { DetailsUploadComponent } from './fileUpload/details-upload/details-upload.component';
import { ListUploadComponent } from './fileUpload/list-upload/list-upload.component';
import { LockerTypeComponent } from './widgets/locker-type/locker-type.component';
import { DropZoneDirective } from './widgets/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ColorPickerComponent } from './widgets/color-picker/color-picker.component';
import { TimePickerComponent } from './widgets/time-picker/time-picker.component';
import { CarouselComponent } from './widgets/carousel/carousel.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { SearchboxComponent } from './widgets/searchbox/searchbox.component';
import { DistrictPickerComponent } from './widgets/district-picker/district-picker.component';
import { CityPickerComponent } from './widgets/city-picker/city-picker.component';
import { SendMessageDialogComponent } from './messages/send-message-dialog/send-message-dialog.component';
import { EventsMapComponent } from './events/events-map/events-map.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { LastEventsComponent } from './events/last-events/last-events.component';
import { FooterComponent } from './page/footer/footer.component';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { FacebookLoginButtonComponent } from './navbar/facebook-login-button/facebook-login-button.component';
import { PoliciesComponent } from './page/policies/policies.component';
import { TermsAndConditionsComponent } from './page/policies/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './page/policies/privacy-policy/privacy-policy.component';
import { LoadingSpinnerComponent } from './widgets/loading-spinner/loading-spinner.component';
import { BicycleImagePlaceholderComponent } from './widgets/bicycle-image-placeholder/bicycle-image-placeholder.component';
import { BicycleImageComponent } from './widgets/bicycle-image/bicycle-image.component';
import { ContactsComponent } from './page/contacts/contacts.component';
import { AboutComponent } from './page/about/about.component';
import { PaypalDonationButtonComponent } from './widgets/paypal-donation-button/paypal-donation-button.component';
import { FacebookButtonComponent } from './widgets/facebook-button/facebook-button.component';
import { InstagramButtonComponent } from './widgets/instagram-button/instagram-button.component';
import { TwitterButtonComponent } from './widgets/twitter-button/twitter-button.component';
import { GithubButtonComponent } from './widgets/github-button/github-button.component';
import { ColorPipe } from './widgets/color-picker/color.pipe';
import { LockerPipe } from './widgets/locker-type/locker.pipe';
import { GenrePickerComponent } from './widgets/genre-picker/genre-picker.component';
import { DatePickerComponent } from './widgets/date-picker/date-picker.component';
import { ContactusFormComponent } from './widgets/contactus-form/contactus-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    EventCardComponent,
    UserProfileComponent,
    SignupDialogComponent,
    LoginDialog,
    GoogleLoginButtonComponent,
    UserAvatarComponent,
    NewEventComponent,
    NotLoggedInComponent,
    NewEventFormComponent,
    ConfirmationDialogComponent,
    MyMapComponent,
    FormUploadComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    LockerTypeComponent,
    DropZoneDirective,
    FileSizePipe,
    ColorPickerComponent,
    TimePickerComponent,
    CarouselComponent,
    TruncatePipe,
    EventEditComponent,
    SearchboxComponent,
    DistrictPickerComponent,
    CityPickerComponent,
    SendMessageDialogComponent,
    EventsMapComponent,
    HeaderComponent,
    LastEventsComponent,
    FooterComponent,
    PasswordResetComponent,
    LoginFormComponent,
    FacebookLoginButtonComponent,
    PoliciesComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    LoadingSpinnerComponent,
    BicycleImagePlaceholderComponent,
    BicycleImageComponent,
    ContactsComponent,
    AboutComponent,
    PaypalDonationButtonComponent,
    FacebookButtonComponent,
    InstagramButtonComponent,
    TwitterButtonComponent,
    GithubButtonComponent,
    ColorPipe,
    LockerPipe,
    GenrePickerComponent,
    DatePickerComponent,
    ContactusFormComponent
  ],
  entryComponents: [
    LoginDialog,
    ConfirmationDialogComponent,
    SignupDialogComponent,
    SendMessageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CoreModule,
    ScrollingModule,
    WavesModule, ButtonsModule,
    MDBBootstrapModule.forRoot()
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [EventService, GeoLocationService, UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
