import Header from "~/components/Header";
import SideNav from "~/components/SideNav";

const About = () => {
  return (
    <div>
      <Header />
      <SideNav />
      <div className="w-5/6 translate-x-[20%] p-8">
        <div className="mt-16">
          <h1 className="text-4xl mb-8">About the project</h1>
          <p className="mb-8">
            This project is inspired by the feeling of community I discovered in record shops once COVID-19 eased enough to go out in public again. 
            During lockdown, I found myself drifting apart from the closeness of the physical world. Like many of us, the lack of sociality and
            ability to go outside left me in a constant state of dissociation. It was in the grip of these moments that I discovered the simple
            pleasure of physically engaging with my music. Every 20-30 minutes an endless sonic flicker would engage me to get up, pick up the
            vinyl, flip it over, and drop the needle back on it. Choosing the music itself became more of a conversation with my library. With
            limitations over choice came conversation.
          </p>
          <p>
            Fast forward a couple years and now I travel to record stores weekly. I listen to what the shopkeep is spinning, and more often than
            not I find myself engaged in conversation with someone about the music I'm looking at, listen to, or have yet to hear. Although record
            stores can often be a symbol of gatekeeping, it is the moments with the earnest crate diggers and music lovers that I've grown so fond of.
            This application is about creating that social atmosphere, even in our personal relationships with our collections. Its about finding the
            excitement of shared albums, and about the social joys of a limited and physical music collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
