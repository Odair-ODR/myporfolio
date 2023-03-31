using SysMyPortfolio.Models;

namespace SysMyPortfolio.App
{
    public class GlobalWebApp
    {
        private static ProyectDetailModel _ProyectDetailModel;
        public static ProyectDetailModel ProyectDetailModel
        {
            get
            {
                ChargeProyectDetail();
                return _ProyectDetailModel;
            }
            private set { _ProyectDetailModel = value; }
        }

        public static int Id { private get; set; }

        private static void ChargeProyectDetail()
        {
            _ProyectDetailModel = new ProyectDetailModel();
            if (Id == 1)
            {
                _ProyectDetailModel.Nombre = "Sistema de Tesorería";
                _ProyectDetailModel.Empresa = "Ediciones Americanas S.A.C.";
                _ProyectDetailModel.Cargo = "Analista Programador";
                _ProyectDetailModel.Fechas = "04/2020 - 03/2023";
                _ProyectDetailModel.Descripcion = "Es un sistema interno para la empresa dónde se registran los movimientos (ingresos, egresos, transferencias), " +
                    "registro de planillas de cobranza, cheques, adelanto de comisiones. También cuenta con reportes como: " +
                    "Libro de bancos, cuadre caja, Perdida/Ganancia, Reportes por concepto, etc.";
                _ProyectDetailModel.TareasRealizadas = new string[] { " Registro de ingresos, egresos, transferencias", "Reportes contables en general", "Registro de planillas de cobranza",
                                                                    "Registro de Cheques como ingresos", "Mantenimiento al Sistema", "Atención de incidencias"};
                _ProyectDetailModel.HerramientasUtilizadas = new string[] { "Lenguaje C#", "SQL Server", " Windows Form", "Report Viewer" };
                _ProyectDetailModel.Imagenes = GetImagesById(Id);
                _ProyectDetailModel.Witdh = "600px";
            }
            else if (Id == 2)
            {
                _ProyectDetailModel.Nombre = "Aplicativo movil de venta de repuestos automotrices.";
                _ProyectDetailModel.Empresa = "Woody";
                _ProyectDetailModel.Cargo = "Programador Freelancer";
                _ProyectDetailModel.Fechas = "03/2021 - 07/2021";
                _ProyectDetailModel.Descripcion = "Es un aplicativo movil para android de registro de ventas de repuestos automotrices";
                _ProyectDetailModel.TareasRealizadas = new string[] { "Logueo", "Registro de pre-factura/Boleta", "Cancelación de pre-factura/boleta",
                                                                    "Generación de comprobante de pago en pdf"};
                _ProyectDetailModel.HerramientasUtilizadas = new string[] { "Lenguaje Kotlin", "SQL Server", "API Sunat" };
                _ProyectDetailModel.Imagenes = GetImagesById(Id);
                _ProyectDetailModel.Witdh = "300px";
            }
            else if (Id == 3)
            {
                _ProyectDetailModel.Nombre = "Módulos";
                _ProyectDetailModel.Empresa = "Ediciones Americanas S.A.C.";
                _ProyectDetailModel.Cargo = "Analista Programador";
                _ProyectDetailModel.Fechas = "04/2020 - 03/2023";
                _ProyectDetailModel.Descripcion = "El módulo de comisiones de vendedores es un sistema para realizar el pago de comisiones, dónde se registra" +
                    " la comisión por nivel de venta (vendor, supervisor, director de ventas) y por institución." +
                    " Posteriormente en base ha esos datos se realiza el calculo por mes para el pago respectivo de cada vendedor, supervisor y director, la cual se le llama Procesamiento de comisiones." +
                    "\n Por otro lado, el módulo de seguimiento de planillas (Registros cuotas por cobrar por servicio brindado) es para tener el control y conocer en que etapa se encuentra un planilla." +
                    " Finalmente, realicé el seguimiento de cheques(Transferencia, depósito/ cheques) de las planillas cobradas para luego registrar en el sistema de tesoreria.";
                _ProyectDetailModel.TareasRealizadas = new string[] { "Desarrollo de todas las etapas de seguimiento de planillas (Envio, Recepción, Listado, Descontado, No descontado)",
                "Desarrollo de toda la funcionalidad de Registro de comisiones", "Desarrollo de toda la funcionalidad de Procesamiento de Comsiones", "Desarrollo de toda la funcionalidad de Seguimiento de Cheques"};
                _ProyectDetailModel.HerramientasUtilizadas = new string[] { "Lenguaje C#", "SQL Server", " Windows Form", "Report Viewer" };
                _ProyectDetailModel.Imagenes = GetImagesById(Id);
                _ProyectDetailModel.Witdh = "600px";
            }
        }

        private static string[] GetImagesById(int id)
        {
            // Ruta de la carpeta que contiene las imágenes

            string nameFoler = "";
            switch (id)
            {
                case 1: nameFoler = "tesoreria"; break;
                case 2: nameFoler = "android"; break;
                case 3: nameFoler = "modulos"; break;
            }
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", nameFoler);

            if (path.Length == 0)
                return null;

            // Obtener la lista de archivos de la carpeta
            string[] files = Directory.GetFiles(path);

            // Arreglo para almacenar los nombres de las imágenes
            string[] imageNames = new string[files.Length];

            // Iterar sobre los archivos y almacenar sus nombres en el arreglo
            for (int i = 0; i < files.Length; i++)
            {
                string fileName = Path.GetFileName(files[i]);
                imageNames[i] = nameFoler + "/" + fileName;
            }
            return imageNames;
        }
    }
}
