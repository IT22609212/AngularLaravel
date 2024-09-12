import { Routes } from '@angular/router';
import { RegisterComponent } from './UserReg/register/register.component';
import { DashboardComponent } from './UserReg/dashboard/dashboard.component';
import { ViewComponent } from './UserReg/view/view.component';
import { LoginComponent } from './UserReg/login/login.component';
import { AddproductComponent } from './home/addproduct/addproduct.component';
import { ViewProductComponent } from './home/view-product/view-product.component';
import { UserDetailsComponent } from './UserReg/user-details/user-details.component';
import { UserProfileComponent } from './UserReg/user-profile/user-profile.component';
import { CartComponent } from './Payment/cart/cart.component';

export const routes: Routes = [
    {path:'',redirectTo:'UserReg/register',pathMatch:'full'},
    {path:'UserReg/register',component:RegisterComponent},
    {path:'UserReg/:userId/view',component:ViewComponent},
    {path:'UserReg/login',component:LoginComponent},
    {path:'UserReg/dashboard',component:DashboardComponent},
    {path:'UserReg/users',component:UserDetailsComponent},
    {path:'home/addProduct',component:AddproductComponent},
    {path:'UserReg/userProfile',component:UserProfileComponent},

    {path:'home/:productId/viewproduct',component:ViewProductComponent},


    ////payment
    {path:'Payment/:productId/cart',component:CartComponent}


];
