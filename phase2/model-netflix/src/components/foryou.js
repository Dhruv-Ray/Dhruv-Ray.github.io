import movies from "../movies.json";

function ForYou(){
    console.log(movies);
    return(
    <div className="wrapper">
        <h2>For You</h2>
        {/* <section id="section-1"> */}
          <div class="items">
            {movies.movies.map((link)=>
                <div class = "item"><img src = {link} alt=""/></div>)}
          </div>
        {/* </section> */}

      </div>
    );
}

export default ForYou;