import { useRef } from "react";
import heroImage from "@/assets/hero-food-feast.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative isolate"
      >
        <div className="absolute inset-0 bg-gradient-surface pointer-events-none" />
        <img
          src={heroImage}
          alt="Fries & Buns hero spread of pizzas, burgers, chicken, and fries"
          className="h-[48vh] w-full object-cover sm:h-[60vh]"
          loading="eager"
        />
        <div className="interactive-spotlight absolute inset-0 opacity-70 mix-blend-soft-light" />
        <div className="container mx-auto px-4">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4">
            <div className="max-w-2xl rounded-xl bg-background/70 p-6 shadow-elevated backdrop-blur">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Hot. Fresh. Irresistible.
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Cheesy pizzas, crispy chicken, juicy burgers — delivered fast.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button variant="hero" className="px-6">Order Now</Button>
                </Link>
                <a href="#deals">
                  <Button variant="outline" className="px-6">View Deals</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
