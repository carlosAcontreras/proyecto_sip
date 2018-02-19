import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'compras', loadChildren: './purchases/purchases.module#PurchasesModule' },
      { path: 'materiales', loadChildren: './materials/materials.module#MaterialsModule' },
      { path: 'ingresos', loadChildren: './income/income.module#IncomeModule' },
      { path: 'despachos', loadChildren: './dispatches/dispatches.module#DispatchesModule' },
      { path: 'reintegros', loadChildren: './refunds/refunds.module#RefundsModule' },
      { path: 'reintegros_masivos', loadChildren: './massive-withdrawals/massive-withdrawals.module#MassiveWithdrawalsModule' },
      { path: 'traslados', loadChildren: './transfer/transfer.module#TransferModule' },
      { path: 'control_series', loadChildren: './control-series/control-series.module#ControlSeriesModule' },
      { path: 'usuarios', loadChildren: './users/users.module#UsersModule' },
      { path: 'permisos', loadChildren: './permits/permits.module#PermitsModule' },
      { path: 'proveedores', loadChildren: './providers/providers.module#ProvidersModule' },
      { path: 'contratos', loadChildren: './contracts/contracts.module#ContractsModule' },
      { path: 'empresas', loadChildren: './company/company.module#CompanyModule' },
      { path: 'bodegas', loadChildren: './wineries/wineries.module#WineriesModule' },
      { path: 'item_cobro', loadChildren: './collection-item/collection-item.module#CollectionItemModule' },
      { path: 'listas_maestras', loadChildren: './master-lists/master-lists.module#MasterListsModule' },
      { path: 'internas', loadChildren: './internal/internal.module#InternalModule' }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }
