import Navbar from '../components/NavBar';
import brennan from '../photos/IMG_3827.jpg';
import patrick from '../photos/image_123650291.JPG'
import defaultpic from '../photos/default.jpg'

export default function About() {
  const developersFirst = [
    {
      name: 'Patrick Hansen',
      role: 'Software Engineer',
      image: patrick,
    },
    {
      name: 'Brennan Mckee',
      role: 'Creative Strategist',
      image: brennan,
    },
    {
      name: 'Hiram Borrero',
      role: 'Flow Lead',
      image: defaultpic,
    },
    {
      name: 'Jessica Hernandez',
      role: 'Creative Strategist',
      image: defaultpic,
    },
    {
        name: 'Alexander Moreno',
        role: 'Group manager',
        image: defaultpic,
      },
  ];



  return (
    <>
      <Navbar />
      <div
        style={{
          background: 'linear-gradient(to bottom, black, gray)',
          padding: '20px',
          minHeight: '100vh', 
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="mb-4 space-y-16 py-4">
          <h2 className="font-heading text-center text-4xl font-semibold text-foreground" style={{ color: 'white' }}>
            About Us <br />
          </h2>
          <p className="font-heading text-center text-2xl font-semibold text-foreground" style={{ color: 'white' }}>
            Fall 2024 <br />
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px', 
            flexGrow: 1, 
          }}
        >
          {developersFirst.map((dev) => (
            <div key={dev.name} className="text-center" style={{ width: '200px' }}>
              <div className="mx-auto overflow-hidden rounded-full" style={{ width: '150px', height: '150px' }}>
                <img
                  src={dev.image}
                  alt={`Image of ${dev.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </div>

              <div className="mt-4" style={{ color: 'white' }}>
                <div className="font-semibold text-lg">{dev.name}</div>
                <div className="text-sm">{dev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
