import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";

interface SportsTshirt {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  material: string;
  features: string[];
  inStock: boolean;
}

interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  data: SportsTshirt[];
  count: number;
}

export default function HealthCollection() {
  const { data, isLoading, error } = useQuery<HealthResponse>({
    queryKey: ["health-collection"],
    queryFn: async () => {
      const response = await fetch("/health");
      if (!response.ok) throw new Error("Error al cargar la colección");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error al cargar la colección</h2>
        <p className="text-muted-foreground">Por favor, intenta de nuevo más tarde</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Link href="/">
            <a className="text-muted-foreground hover:text-primary transition-colors">
              Inicio
            </a>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold">Health & Wellness</span>
        </div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Colección Health & Wellness
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {data?.message || "Camisetas deportivas de alta calidad"}
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          {data?.count} productos disponibles
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-primary/50"
          >
            {/* Product Image Section */}
            <div className="aspect-square bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                {product.category === "sports" ? "🏃" : "💪"}
              </div>
              {product.inStock && (
                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  En Stock
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {product.color}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Material:
                </p>
                <p className="text-sm">{product.material}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Características:
                </p>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Precio</p>
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform"
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Añadir
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">¿Listo para tu entrenamiento?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
          Descubre camisetas diseñadas para rendimiento y comodidad
        </p>
        <Link href="/">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold">
            Explorar más productos
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
