export class constantes {
    public routeGlobal = '/api/';

    public SUBMENUS = {
        'Materiales': 1,
        'Compras': 2,
        'Ingresos': 3,
        'Despachos': 4,
        'Reintegros': 5,
        'Reintegros_Masivos': 6,
        'Devoluciones': 7,
        'Traslados': 8,
        'Control_Series': 9,

        'Usuario': 10,
        'Permisos': 11,
        'Proveedores': 12,
        'Contratos': 13,
        'Empresas': 14,
        'Bodegas': 15,

        'Item_Cobro': 20,
        'Listas_Maestras': 21,

        'Documentos_Epm': 30,
        'Obras_Internas': 31,
        'Obras_Externas': 32,
        'Operaciones': 33,
        'Asignación_de_Encargados': 34,
        'Programación_Masiva': 35,
        'Importar_Obra': 36,
        'Pago_Actividades': 37,
        'Impresion': 38,
        'Extraer_Datos': 39,
        'Programación': 40,
    }


    public KEYBOARD = {
        'TECLA_F2': 113
    }

    constructor() { }

    getRouterGlobal() {
        return this.routeGlobal;
    }
}