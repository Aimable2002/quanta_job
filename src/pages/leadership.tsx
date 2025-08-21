
const leadershipTeam = [
  {
    name: "KANAMUGIRE Enock",
    title: "Founder & CEO",
    bio: "Enock leads QUANTA with ruthless focus and future obsession—turning bold ideas into working systems. He embodies extreme ownership and insists on excellence in every detail we ship.",
    photo: "/images/enock.jpg" // You'll need to add actual photos
  },
  {
    name: "Omella",
    title: "Chief Growth Officer (CGO)",
    bio: "Omella aligns product with real human needs. She blends empathy, clarity, and precision to scale adoption while keeping our focus on what truly matters.",
    photo: "/images/omella.jpg"
  },
  {
    name: "Lewis Ndatimana",
    title: "Head of Business Development",
    bio: "Lewis converts opportunities into long-term value through disciplined execution and an ownership mentality focused on results.",
    photo: "/images/lewis.jpg"
  },
  {
    name: "Victoire Ushindi",
    title: "Lead Software Engineer",
    bio: "Victoire builds resilient, elegant systems that reflect our Impute value—craft, clarity, and speed—ready for Earth and beyond.",
    photo: "/images/victoire.jpg"
  }
];

export const LeadershipTeam = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 sm:text-5xl">
            Leadership Team
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-200 leading-7">
            At QUANTA, leadership means empathy for users, extreme ownership of outcomes, and a 100x mindset for speed, quality, and impact. Meet the people guiding our mission.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {leadershipTeam.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex flex-col items-center text-center">
                {/* Profile Photo Placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 flex items-center justify-center text-4xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                <p className="mt-2 text-blue-400">{member.title}</p>
                
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                
                <p className="mt-4 text-gray-300 leading-6">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Our Leadership Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {['Empathy', 'Focus', 'Impute', 'Intelligent Unity', '100x Mindset'].map((value, index) => (
              <div key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <span className="text-sm text-blue-400">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} QUANTA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};