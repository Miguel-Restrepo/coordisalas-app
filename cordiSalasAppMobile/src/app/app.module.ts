import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from './modules/calendar/calendar.module';
import { ReportsModule } from './modules/reports/reports.module';
import { RequestRoomModule } from './modules/request-room/request-room.module';
import { RoomModule } from './modules/room/room.module';
import { SecurityModule } from './modules/security/security.module';
import { UserModule } from './modules/user/user.module';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { HeaderComponent } from './public/master-page/header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
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
    RequestRoomModule,
    ReportsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
