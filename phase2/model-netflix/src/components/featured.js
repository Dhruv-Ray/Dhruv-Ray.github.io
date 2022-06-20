function Featured(){
    return(
        <header className='featured'>
        <div className='featured_content'>
          <h1 className="featured_title">Ready Player One</h1>
          <div className="featured_buttons">
            <button type='button' className="featured_button">Play</button>
            <button type ="button" className="featured_button">My List</button>
          </div>
          <h1 className="featured_description">
            In 2045, the creator of a virtual reality universe promises his fortune to the first person to discover a digital Easter egg. Soon, young Wade Watts finds himself in a reality-bending treasure hunt through the mysterious and fantastical world.
          </h1>
        </div>
        <div className='featured_fade'></div>
      </header>
    );
}

export default Featured;