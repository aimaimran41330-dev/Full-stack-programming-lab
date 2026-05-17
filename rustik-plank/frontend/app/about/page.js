export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="relative h-64 mb-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200"
          alt="Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white font-serif">About Rustik Plank</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-primary pl-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Rustik Plank was founded with a simple belief: furniture should be both beautiful and sustainable.
            We source reclaimed wood from old barns, factories, and demolition sites — giving new life to
            materials that would otherwise be wasted.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every piece we create is handcrafted by skilled artisans who take pride in their work.
            No two pieces are exactly alike — each carries the unique grain patterns, knots, and
            character of its original life.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600"
            alt="Craftsman"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Handcrafted", icon: "🔨", desc: "Every piece made by skilled artisans using traditional techniques." },
          { title: "Sustainable", icon: "🌱", desc: "Reclaimed and responsibly sourced wood for every product." },
          { title: "Unique", icon: "✨", desc: "No two pieces identical — natural grain makes each one special." },
        ].map((val) => (
          <div key={val.title} className="text-center p-6 border border-gray-100 bg-gray-50">
            <div className="text-4xl mb-3">{val.icon}</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{val.title}</h3>
            <p className="text-gray-600 text-sm">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



