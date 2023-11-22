import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from './modules/calendar/calendar.module';
import { RequestRoomModule } from './modules/request-room/request-room.module';
import { RoomModule } from './modules/room/room.module';
import { SecurityModule } from './modules/security/security.module';
import { UserModule } from './modules/user/user.module';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { HeaderComponent } from './public/master-page/header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule,
    RoomModule,
    CalendarModule,
    HttpClientModule,
    NgbModule,
    FullCalendarModule,
    UserModule,
    RequestRoomModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
