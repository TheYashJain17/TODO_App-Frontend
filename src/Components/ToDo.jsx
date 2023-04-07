import React, { useEffect, useState } from 'react'

import './style.css';

const getLocalData = () => {

  const data = localStorage.getItem('TodoList')

  if(data){

    return JSON.parse(data);

  }
  else{

    return  [];

  }

}

const ToDo = () => {

    const [inputData , setInputData] = useState('');

    const [items , setItems] = useState(getLocalData());

    const [editItems , setEditItems] = useState('');

    const [toggleButton , setToggleButton] = useState(false);

  const addItem = () => {

    if(!inputData){

      alert('You Must Have Atleast One Item');

    }

    else if(inputData && toggleButton){

      setItems(

        items.map((element) => {

          if(element.id === editItems){

            return {...element , name : inputData}

          }

          return element;

        })


      )

      setInputData('');

      setEditItems('');

      setToggleButton(false);

    }

    else{

      const myNewInputData =  {

        id : new Date().getTime().toString(),
        name : inputData

      }

      setItems([...items , myNewInputData]);

      setInputData('');


    }


  }

  const deleteItem = (index) => {

    const updatedItems = items.filter((element) => {

      return element.id !== index;

    })

    setItems(updatedItems);

  }

  const deleteAllItems = () => {

    setItems([]);


  }

  const editItem = (index) => {

    const updatedItems = items.find((element) => {

      return element.id === index

    })

    setInputData(updatedItems.name);

    setEditItems(index);

    setToggleButton(true);






  }

  useEffect(() => {

    localStorage.setItem("TodoList" , JSON.stringify(items));


  } , [items])



  return (

    <>
    
    <div className="main-div">

    <div className="child-div">

    <figure>

    <img src="" alt="todoLogo" />

    <figcaption>Add Your List Here</figcaption>

    </figure>

    <div className="addItems">

    <input type="text" placeholder='✍ Add Items' className='form-control'
    value={inputData} onChange={(element) => setInputData(element.target.value)}/>


    {

      toggleButton ? <i className='far fa-edit add-btn' onClick={addItem}></i>

      :

      <i className='fa fa-plus add-btn' onClick={addItem}></i>



    }


    </div>

    <div className="showItems">

    {

      items.map((element) => {

        return(

      <div className="eachItem" key={element.id}>

          <h3>{element.name}</h3>

            <div className="todo-btn">

              <i className='far fa-edit add-btn' onClick={() => editItem(element.id)}></i>
              <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(element.id)}></i>
            
          </div>

      </div>


        )


      })

    }


    </div>

    <div className="showItems">

    <button className='btn effect04' data-sm-link-text="Remove All" onClick={deleteAllItems}><span>Check List</span></button>

    </div>

    </div>

    </div>
    
    </>





  )

}

export default ToDo