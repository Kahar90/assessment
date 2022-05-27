// importing so that we can use the useEffect hook to fetch data from the server. 
// and then set the posts state to the data we get back from the server.
import { useEffect, useState } from 'react'; 



function App() {
  // we are using the useState hook to set the posts state. and also declaring variables and states required for the program
  const [posts, setPosts] = useState<any[]>([]); // Controls the posts that are displayed on the page.
  const [originalPosts, setOriginalPosts] = useState<any[]>([]); //  The original data from API.
  const [updatedPosts, setUpdatedPosts] = useState<any[]>([]); // The data that is acquired from filtering, declared here so that we can call it wherever.
  const [next, setNext] = useState(5); // The next page of data to be displayed.
  const postsPerPage = 5; 
  const [mainPost, setMainPost] = useState(true); // Controls the if it is the originalposts that is displayed on the page (boolean). Controls the button "load more".

  // This is the function that controls the slicing of the data. Receive the end var that has the index of the last element to be displayed.
  // also receive the data that is to be sliced. After slicing, it then sets the slicedPosts state.
  const SlicePosts = (end, postsToSend) => {
    const slicedPosts = postsToSend.slice(0, end);
    setPosts(slicedPosts);
  };


  // Controls the "load more" logic by setting the next state to the next page of data.
  const handleShowMorePosts = (postsToSend) => {
    SlicePosts(next + postsPerPage, postsToSend);
    setNext(next + postsPerPage);
  };

  // Called when page renders for the first time. Fetches the data from the server and sets it to the posts state.
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        setPosts(json.posts.slice(0, next));
        setOriginalPosts(json.posts);
      })
      .catch((err) => console.log(err));
  }, []);


  // Called when the user filters the data. 
  const filterPosts = (e) => {
    // Sets default value for display
    setNext(5);
    setMainPost(false);

    // Filters the data according to the query, and sets it to the updatedPosts state.
    setUpdatedPosts(
      originalPosts.filter((post) => {
        return post.categories.find((category) => category.name === e);
      })
    );
    
    // Sets the filtered posts to the posts state.
    setPosts(updatedPosts.slice(0, next));
  };

  // Called when the user clicks the "reset" button. Resets the posts state to the original data, set the bool to true, and displaying it on the page.
  const resetPosts = () => {
    setMainPost(true);
    setPosts(originalPosts);
    SlicePosts(postsPerPage, originalPosts);
  };

  // UI for the page.
  return (
    <div>
      {
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="fw-normal text-center my-3">Posts</h1>
              <div className="row my-4 justify-content-left">
                <h2>Filter</h2>
                <div className="col">
                  {/* Buttons for filtering posts according categories, categories are retrieved from data.json. Each button calls the function with the parameter
                  of it's corresponding button. ex: "Surveys and Forms" button calls the filterPosts("Surveys and Forms") function. */}
                  <button
                    className="btn btn-primary"
                    onClick={() => filterPosts('Surveys and Forms')}
                  >
                    Surveys and Forms
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={() => filterPosts('Digital Marketing')}
                  >
                    Digital Marketing
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={() => filterPosts('Platform News and Updates')}
                  >
                    Platform News and Updates
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={() => filterPosts('Tips and Best Practise')}
                  >
                    Tips and Best Practise
                  </button>
                </div>

                <div className="row my-4 justify-content-center">
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => filterPosts('Data Management')}
                    >
                      Data Management
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => filterPosts('Marketing Analytics')}
                    >
                      Marketing Analytics
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => filterPosts('Ecommerce')}
                    >
                      Ecommerce
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setPosts(originalPosts);
                        filterPosts('Landing Pages');
                      }}
                    >
                      Landing Pages
                    </button>
                  </div>
                  <div className="col">
                    {/* Reset button calls the resetPosts() restoring it to the default state */}
                    <button
                      className="btn btn-primary"
                      onClick={() => resetPosts()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              {/* Displaying the data in a table */}
              <h5>Displays 5 posts per pagination</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Displaying the data recursively into the table */}
                  {posts.map(({ author, id, title, summary }) => (
                    <tr key={id}>
                      <td>{author.name}</td>
                      <td>{id}</td>
                      <td>{title}</td>
                      <td>{summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Because handleShowMorePosts() both controls the pagination for both the original data and updated data, we use
              simple bool logic to display different button with different function calls. When the original data is showed in the page
              the button that is displayed is the one with originalPosts parameter, and vice versa. */}
              <div className="loadmorebutton row justify-content-center ">
                {mainPost ?  <button
                  className="btn btn-primary justify-content-center"
                  onClick={() => handleShowMorePosts(originalPosts)}
                >
                  Load More
                </button> : <button
                  className="btn btn-primary justify-content-center"
                  onClick={() => handleShowMorePosts(updatedPosts)}
                >
                  Load More
                </button> }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
