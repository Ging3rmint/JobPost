import React,{Fragment, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Posts from "./components/layouts/Posts";
import jobDB from "./components/modules/jobDB";
import Filter from "./components/layouts/Filter";
import './App.css';


const App = () => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [showFilter, enableFilter] = useState(false);

  const onClick = (e) => {
    const {textContent} = e.target;
    if (!searchTerms.includes(textContent)){
      setSearchTerms([...searchTerms, textContent])
      enableFilter(true);
    }

  };

  const clear = (e) => {
    const {className, textContent, previousElementSibling} = e.target;
    if (className === "clear"){
      setSearchTerms("");
      
    }else if (className === "term"){
      setSearchTerms(searchTerms.filter(term => term !== textContent));
    }else{
      setSearchTerms(searchTerms.filter(term => term !== previousElementSibling.textContent));
    }
    console.log(searchTerms.length);
    if (searchTerms.length <= 1){
      enableFilter(false);
    }

  } 

  const checkCriteria = (data) =>{
    return searchTerms.every(term => { //loop each term and return true if match all
        return data.skills.includes(term);
    })
  }

  const isSmall = useMediaQuery("(max-width: 1050px)");

  const createPost = (post) => (
    <Posts
        key={post.id}
        onClick = {onClick}
        showLine = {isSmall}
        companyName= {post.companyName}
        jobTitle = {post.jobTitle}
        companyLogo= {post.companyLogo}
        skills = {post.skills}
        new = {post.new}
        featured = {post.featured}
        dayOfPost = {post.dayOfPost}
        contract = {post.contract}
        region = {post.region}
    />
  );
  
  return(
  <Fragment>
    <Header />
    <Filter terms={searchTerms} onClick={clear} visible={showFilter}/>
      {
        searchTerms.length > 0? jobDB.filter(checkCriteria).map(createPost) : jobDB.map(createPost)
      }

    <Footer />
  </Fragment>

)};

export default App;

