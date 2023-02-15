
import fs from "fs"

class Producto {
    constructor(id,title,descripction,code,price,status,sotck,category,thumbnails){
        this.id = id,
        this.title = title,
        this.descripction = descripction,
        this.code = code,
        this.price = price,
        this.status = status, 
        this.sotck = sotck,
        this.category = category,
        this.thumbnails = thumbnails
    }
}

class ProductManager {


    constructor(products){
        this.products = new Array();
        this.productsId
        this.productsDirPath = "./src/Json"
        this.productsFilePath = this.productsDirPath + "/productos.json"
        this.fileSystem = fs
    }

    fsPreaparandoDirecttorios = async ()=>{
        await this.fileSystem.promises.mkdir(this.productsDirPath, { recursive: true });
        if(!this.fileSystem.existsSync(this.productsFilePath)) {
            console.log("Creando archivo");
            await this.fileSystem.promises.writeFile(this.productsFilePath, "[]");
        }
    }

    getProduct = async ()=>{
       try {
        await this.fsPreaparandoDirecttorios();

        let productosFile = await this.fileSystem.promises.readFile(this.productsFilePath, "utf-8");
         
        // console.info("Archivo JSON obtenido desde archivo: ");
        // console.log(productosFile);
        this.products = JSON.parse(productosFile);
        // console.log("Productos obtenidos: ");
        // console.log(this.products);
        return this.products;

    } catch (error) {
        console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.products}, 
            detalle del error: ${error}`);
        throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.products},
         detalle del error: ${error}`);
    }
    }

    idUltProducto = async()=>{
        await this.getProduct();

        let idUltProducto = this.products.length
    
        return idUltProducto
    }
    
    addProduct = async (title,descripction,code,price,status,sotck,category,thumbnails)=>{
        let idUltProducto = await this.idUltProducto()

        let contador = idUltProducto + 1
        
        let productoNuevo = new Producto(contador,title,descripction,code,price,status,sotck,category,thumbnails)
        console.log('Creando producto nuevo:');
        console.log(productoNuevo);
        
        try {
            await this.fsPreaparandoDirecttorios();
            await this.getProduct();

            this.products.push(productoNuevo);
            console.log("Lista actualizada de Producos: ");
            console.log(this.products);
            

            console.log("Guardando lista nueva...");
            await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
        } catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(productoNuevo)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(productoNuevo)}, detalle del error: ${error}`);
        }
    }

    getProductById=async(id)=>{
        try {
            await this.fsPreaparandoDirecttorios();
            await this.getProduct();

            this.products.map(async(elem)=>{
                if(elem.id === id && id > 0){
                   this.productsId = elem                                       
                }
            })
            
            return this.productsId
        } catch (error) {
            console.error(`Error no se econtro producto, detalle del error: ${error}`);
            throw Error(`Error no se econtro producto, detalle del error: ${error}`);
        }
    }

    updateProduct = async (id, param, valor)=>{

        try {

            
            await this.fsPreaparandoDirecttorios();
            await this.getProduct();

            this.products.map(async(elem)=>{
                if(elem.id === id && id > 0){
                    console.log("Producto a actualizar :");
                    console.log(this.products[id-1]);

                    let keys = Object.keys(this.products[id-1])
                    
                    keys.map((elem)=>{
                        if(elem===param){
                            
                            if(elem==="titulo"){
                                this.products[id-1].titulo=valor
                            }
                            if(elem==="descripcion"){
                                this.products[id-1].descripcion=valor
                            }
                            if(elem==="price"){
                                this.products[id-1].price=valor
                            }
                            if(elem==="url"){
                                this.products[id-1].url=valor
                            }
                            if(elem==="code"){
                                this.products[id-1].code=valor
                            }
                            if(elem==="sotck"){
                                this.products[id-1].code=sotck
                            }
                        }
                    })                        
                }
            })

            console.log("Producto actualizado");
            console.log(this.products[id-1]);
            console.log("Lista actualizada:");
            console.log(this.products);


            await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));

            
        } catch (error) {
            console.error(`Error no se econtro producto, detalle del error: ${error}`);
            throw Error(`Error no se econtro producto, detalle del error: ${error}`);
        }
    }

    deleteProduct= async(id)=>{
        try {
            await this.fsPreaparandoDirecttorios();
            await this.getProduct();

            console.log("Lista actual :");console.log(this.products);

            this.products.map(async(elem)=>{
                if(elem.id === id && id > 0){

                    console.log("Eliminando...");
                    console.log(elem);
                    this.products.splice( (id-1) , 1)
    
                    console.log("Lista Nueva:");
                    console.log(this.products);
                    
                    await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
                    
                }
            })
            
        } catch (error) {
            console.error(`Error eliminando producto: ${this.products[id-1]}, detalle del error: ${error}`);
            throw Error(`Error eliminando producto: ${this.products[id-1]}, detalle del error: ${error}`);
        }
    }

}

export default ProductManager


// productos.addProduct("Iphone","Iphone 14 plus 128GB","700","https://www.ventasrosario.com.ar/wp-content/uploads/2022/09/61XO4bORHUL._AC_SL1500_.jpg","000000000001",40)

// console.log(productos.getProductById(1))

// console.log(productos.updateProduct(1,"titulo","Samsung"))

// console.log(productos.deleteProduct(1))











