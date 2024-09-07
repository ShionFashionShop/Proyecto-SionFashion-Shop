namespace MODELS
{
    public class Producto
    {
        public int ProductoId { get; set; }
        public string CodigoProducto { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string Descripcion { get; set; }

        // Relación con CategoriaProducto (Agregación)
        public int CategoriaProductoId { get; set; }
        public CategoriaProducto CategoriaProducto { get; set; }

        // Relación con DetalleProducto (Composición)
        public ICollection<DetalleProducto> DetallesProducto { get; set; }

        // Relación con Proveedor (Agregación)
        public ICollection<Proveedor> Proveedores { get; set; }

        // Relación con VentaProducto (Agregación)
        public ICollection<VentaProducto> VentasProducto { get; set; }
    }
}
