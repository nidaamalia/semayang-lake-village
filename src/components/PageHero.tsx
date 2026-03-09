interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

const PageHero = ({ image, title, subtitle }: PageHeroProps) => (
  <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${image}')` }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
      }}
    />
    <div className="relative z-10 text-center px-4 max-w-3xl">
      <h1
        className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
    {/* Curved bottom edge */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
        <path
          d="M0,40 C360,100 1080,-20 1440,40 L1440,80 L0,80 Z"
          fill="hsl(var(--background))"
        />
      </svg>
    </div>
  </section>
);

export default PageHero;
