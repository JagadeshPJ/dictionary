//Start of the document

//Function to fetch data from api
async function fetchData(word)
{
  let url='https://api.dictionaryapi.dev/api/v2/entries/en/';
  url=url+word;
  try 
  {
    let res = await fetch(url);
    return await res.json();
  } 
  catch (error) 
  {
    console.log(error);
  }
}
//Function to search the desired word
async function searchWord()
{
    if(document.getElementById("inp").value==="")
    {
        alert("Enter any word to search");
    }
    else{
    let data= await fetchData(document.getElementById("inp").value);
    console.log(data);
    //Displaying the data in browser using DOM   
    displayDefinition(data);
    
    document.getElementById("inp").value="";
    }
    
}
//Function to display the data
function displayDefinition(data)
{
  //to check no word found error
  if(data["title"]==="No Definitions Found")
  {
    document.body.innerHTML=`<h4 id="msg">${data["title"]}<h4>`;
    document.body.innerHTML+=`<h5 id="msg">${data["message"]}<h5>`;
    document.body.innerHTML+=`<h5 id="msg">${data["resolution"]}<h5>`;
  }
  else
  {
    //Condition checking to overwrite the previously fetch data if available
    let check=document.getElementById("content"); 
    if(check!=null)
    {
      document.getElementById("content").innerHTML="";
      var container=document.getElementById("content");
    }
    else
    {
    //Data container
    var container=document.createElement("div");
    container.setAttribute("class","container-fluid");
    container.setAttribute("id","content");
    }
    //Iterating through each data element
    data.forEach( (grand) =>{
    //Word
    let name=document.createElement("div");
    name.setAttribute("id","name");
    name.innerHTML=`${grand["word"]}`;
    
    //Phonetic
    let phonetic=document.createElement("div");
    phonetic.setAttribute("id","phonetic");
    phonetic.innerHTML=`[${grand["phonetic"]}]<br><br>`;

    //Logic to play the audio 
    let audio=document.createElement("audio");
    audio.setAttribute("id","audio");
    if(grand["phonetics"].length!=0){
    audio.setAttribute("src",`${grand["phonetics"][0]["audio"]}`);
    }

    let i=document.createElement("i");
    i.setAttribute("class","fa fa-volume-up");
    i.setAttribute("id","i");

    //Button to support the logic of audio
    let btn=document.createElement("i");
    btn.setAttribute("type","button");
    btn.setAttribute("onclick","playAudio()");

    btn.appendChild(i);

    //Origin of word
    let origin=document.createElement("p");
    origin.setAttribute("id","origin");
    origin.innerHTML=`<b id="m"><br>Origin : </b>${grand["origin"]}`;

    //Meaning of word
    let meaning=document.createElement("p");
    meaning.setAttribute("id","meaning");
    meaning.innerHTML=`<b id="m">Meanings : </b><br>`;
    
    var temp=grand["meanings"]; 
    //Iterating through all meanings
    temp.forEach( (meani) =>{

    let pspeech=document.createElement("p");
    pspeech.setAttribute("id","pspeech");
    pspeech.innerHTML=`<b id="ps">Parts of Speech : </b>${meani["partOfSpeech"]}`;

    let def=document.createElement("p");
    def.setAttribute("id","definition");
    def.innerHTML=`<b id="m">Definitions : </b><br><br>`;

    let def1=meani["definitions"];
    def1.forEach(defe => {

    let d1=document.createElement("p");
    d1.setAttribute("id","def");
    d1.innerHTML=`<b>&ensp;&ensp;Definition : </b>${defe["definition"]}`;

    let d2=document.createElement("p");
    d2.setAttribute("id","def");
    d2.innerHTML=`<b id="ex">&ensp;&ensp;Example : </b>${defe["example"]}`;

    let d3=document.createElement("p");
    d3.setAttribute("id","def");
    d3.innerHTML=`<b id="syn">&ensp;&ensp;Synonym : </b>`;

    //Iterating through all synonyms
    let t3=defe["synonyms"];
    if(t3.length==0)
    {
      d3.innerHTML+=`Nill`;
    }
    d3.innerHTML+=`<br>`;
    t3.forEach(ele =>
      d3.innerHTML+=`&emsp;&emsp;&emsp;${ele}<br>`
    );

    //Iterating through all antonyms
    let d4=document.createElement("p");
    d4.setAttribute("id","def");
    d4.innerHTML=`<b id="ant">&ensp;&ensp;Antonym : </b>`;

    let t4=defe["antonyms"];
    if(t4.length==0)
    {
      d4.innerHTML+=`Nill`;
    }
    d4.innerHTML+=`<br>`;
    t4.forEach(ele =>
      d4.innerHTML+=`&emsp;&emsp;&emsp;${ele}<br>`
    );
    d4.innerHTML+=`<br><br>`;
    def.appendChild(d1);
    def.appendChild(d2);
    def.appendChild(d3);
    def.appendChild(d4);


    });

    //Appending to parent element
    container.appendChild(name);
    container.appendChild(phonetic);
    container.appendChild(btn);
    container.appendChild(audio);
    container.appendChild(origin);
    meaning.appendChild(pspeech);
    meaning.appendChild(def);
    container.appendChild(meaning);


    

    

  }); 
     
    
});
    //Master append to body tag
    document.body.appendChild(container);
  }

}
//Function to play audio onclick
function playAudio()
{
  console.log("Play audio");
  let t=document.getElementById("audio");
  t.play();
}
//Header and body part 
function getData() 
{
  
  let grandDiv=document.createElement("container");
  grandDiv.setAttribute("class","bg-secondary");

  let headerDiv=document.createElement("div");
  headerDiv.setAttribute("class","sm-5 p-4 header text-center");
  headerDiv.innerHTML=`Dictionary`;
  headerDiv.setAttribute("id","head");

  let bodyDiv=document.createElement("div");
  bodyDiv.setAttribute("id","body");

  let row=document.createElement("div");
  row.setAttribute("class","row align-items-center");

  let datum=document.createElement("div");
  datum.setAttribute("class","col");

  let search=document.createElement("div");
  search.setAttribute("class","input-group mb-3");

  let input=document.createElement("input");
  input.setAttribute("class","form-control input-text");
  input.setAttribute("id","inp");
  input.setAttribute("type","text");
  input.setAttribute("placeholder","Enter word to search....");
  input.required="true";
  

  let searchIcon=document.createElement("div");
  searchIcon.setAttribute("class","input-group-append");

  let inputIcon=document.createElement("button");
  inputIcon.setAttribute("class","btn btn-primary btn-lg");
  inputIcon.setAttribute("type","button");
  inputIcon.setAttribute("id","button1");
  inputIcon.setAttribute("onclick","searchWord()");

  let i=document.createElement("i");
  i.setAttribute("class","fa fa-search");


  inputIcon.appendChild(i);
  searchIcon.appendChild(inputIcon);

  search.appendChild(input);
  search.appendChild(searchIcon);

  datum.appendChild(search);
  row.appendChild(datum);

  bodyDiv.appendChild(row);




  grandDiv.appendChild(headerDiv);
  grandDiv.appendChild(bodyDiv);
  document.body.appendChild(grandDiv);
}
//Function call origin
getData();

//End of the document