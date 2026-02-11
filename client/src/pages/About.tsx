import { motion } from "framer-motion";
import { CheckCircle2, Code2, Database, Layout } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Layout,
      title: "Frontend",
      description: "React, TypeScript, Tailwind CSS, TanStack Query, and Framer Motion for a smooth, responsive UI."
    },
    {
      icon: Database,
      title: "Backend",
      description: "Express.js server with Drizzle ORM managing PostgreSQL. Type-safe API contracts via Zod."
    },
    {
      icon: Code2,
      title: "Structure",
      description: "Clean separation of concerns. Shared schema types between client and server for full type safety."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <section className="pt-10 md:pt-0 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-heading font-bold"
        >
          About This Template
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
        >
          This application serves as a minimalist, production-ready foundation for fullstack web projects.
          It prioritizes code quality, type safety, and design aesthetics.
        </motion.p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <section className="bg-secondary/30 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-heading font-bold">Why this stack?</h2>
            <p className="text-muted-foreground">
              We believe in tools that get out of your way. This stack is selected to provide
              maximum power with minimal boilerplate. It scales from a simple prototype to a 
              complex SaaS application without needing a rewrite.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            {[
              "Type-safe end-to-end",
              "Zero-config routing",
              "Instant HMR updates",
              "Beautiful default components",
              "Mobile-first responsive design"
            ].map((item, i) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
