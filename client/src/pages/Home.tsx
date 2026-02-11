import { useMessages } from "@/hooks/use-messages";
import { MessageForm } from "@/components/MessageForm";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Quote } from "lucide-react";

export default function Home() {
  const { data: messages, isLoading } = useMessages();

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      <section className="text-center space-y-4 pt-10 md:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border">
            Version 1.0.0
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight"
        >
          My New Project
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          A minimal, production-ready starting point for your next big idea. 
          Built with React, Tailwind, and Express.
        </motion.p>
      </section>

      <section>
        <MessageForm />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Community Feed
            </h2>
            <span className="text-sm text-muted-foreground">
              {messages?.length || 0} posts
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card p-6 rounded-xl border border-border/60 shadow-sm space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : messages?.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border"
            >
              <p className="text-muted-foreground">No messages yet. Be the first to post!</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {messages?.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="group bg-card p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                        <Quote className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground leading-relaxed">{msg.content}</p>
                      <p className="text-xs text-muted-foreground font-medium pt-2">
                        Message #{msg.id}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
