import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Zap, TrendingUp, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Tee",
    price: "$29.99",
    color: "Navy",
    image: "🎨",
    description: "100% algodón puro, cómodo para todo el día"
  },
  {
    id: 2,
    name: "Vintage Vibes",
    price: "$34.99",
    color: "Burgundy",
    image: "🎭",
    description: "Diseño retro con estilo moderno"
  },
  {
    id: 3,
    name: "Street Style",
    price: "$39.99",
    color: "Black",
    image: "⚡",
    description: "Perfecto para tu look urbano"
  },
  {
    id: 4,
    name: "Summer Colors",
    price: "$29.99",
    color: "Pastel",
    image: "🌈",
    description: "Colores vibrantes para la temporada"
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: "Envío Gratis",
    description: "En compras mayores a $50"
  },
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Recibe tu pedido en 3-5 días"
  },
  {
    icon: Heart,
    title: "Garantía de Calidad",
    description: "100% satisfecho o tu dinero de vuelta"
  },
  {
    icon: TrendingUp,
    title: "Tendencias Actuales",
    description: "Diseños exclusivos y limitados"
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-32 px-4 -mx-4 md:-mx-8 mb-20 mt-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-purple-500/30 text-purple-200 text-sm font-semibold border border-purple-500/50">
              ✨ Nuevas Colecciones 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Camisetas que <span className="text-purple-400">expresan tu estilo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Descubre nuestra colección exclusiva de camisetas de alta calidad con diseños únicos que reflejan tu personalidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
              Comprar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-white hover:bg-purple-950">
              Ver Catálogo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <Icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Products Section */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Catálogo de Camisetas</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra selección de camisetas cuidadosamente diseñadas para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                {product.image}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.color}</p>
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Añadir
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">¿Listo para tu próximo atuendo?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe un descuento del 10% en tu primera compra
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 font-bold">
              Suscribirse
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "María García",
              comment: "Excelente calidad y diseño. La compra llegó rápido y bien empacada.",
              rating: "⭐⭐⭐⭐⭐"
            },
            {
              name: "Carlos López",
              comment: "Las camisetas son súper cómodas y los diseños son únicos. Volveré a comprar.",
              rating: "⭐⭐⭐⭐⭐"
            },
            {
              name: "Ana Rodríguez",
              comment: "Mejor tienda online de camisetas. Recomendado 100%.",
              rating: "⭐⭐⭐⭐⭐"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card"
            >
              <div className="mb-4">{testimonial.rating}</div>
              <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
              <p className="font-bold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
