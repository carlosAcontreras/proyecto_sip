export class constantes {
    public routeGlobal = '/api/';

    public Materiales = 1;
    public Compras = 2;
    public Ingresos = 3;
    public Despachos = 4;
    public Reintegros = 5;
    public Reintegros_Masivos = 6;
    public Devoluciones = 7;
    public Traslados = 8;
    public Control_Series = 9;

    public Usuario = 10;
    public Permisos = 11;
    public Proveedores = 12;
    public Contratos = 13;
    public Empresas = 14;
    public Bodegas = 15;

    public Item_Cobro = 20;
    public Listas_Maestras = 21;

    public Documentos_Epm = 30;
    public Obras_Internas = 31;
    public Obras_Externas = 32;
    public Operaciones = 33;
    public Asignación_de_Encargados = 34;
    public Programación_Masiva = 35;
    public Importar_Obra = 36;
    public Pago_Actividades = 37;
    public Impresion = 38;
    public Extraer_Datos = 39;
    public Programación = 40;

    constructor() { }

    getRouterGlobal() {
        return this.routeGlobal;
    }
}