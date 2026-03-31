import React, { useState, useEffect } from "react";

export const TodoList = () => {

  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const API_URL = "https://playground.4geeks.com/todo"

      const crearUsuario = () => {
        fetch(API_URL + "/users/CarlosNarvaez", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json()) //conviuerte la respuesta a un formato JSON
            .then(data => console.log(data))  //toma los datos para mostrar en la consola
            .catch(error => {
                console.error("Hubo un problema al crear el usuario", error); //imprimir el error en la consola para depurar
            })

    }

    const obtenerLista = () => {
        fetch(API_URL + "/users/CarlosNarvaez")
            .then((response) => {
                if(response.status === 404){
                    crearUsuario()
                }
                return response.json()
            }) 
            .then(data => { setList(data.todos) })  //toma los datos para mostrar en el array
            .catch(error => {
                console.error("Hubo un problema al obtener la lista de tareas", error); //imprimir el error en la consola para depurar
            })
    }

      useEffect(() => {
          //onload
          obtenerLista()
      }, [])

  const add = (event) => {
    setTask(event.target.value)
  };

  const addLi = (event) => {
    if (event.key==='Enter' && task.trim() !== "") {
      setList([...list, task])
      setTask("") 
    }
  };

  const deleteLi = (paramIndex) => {
    let element = list.filter((item, index) => index!=paramIndex)
    setList(element)
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>

          <h1 >todos</h1>
          <div >
            <input type="text" value={task} onChange={add} onKeyDown={addLi} className="ps-5" placeholder="What needs to be done?" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
          <ul>
            {list.map((item) => (
              <li className='ps-5 d-flex justify-content-between align-items-center' key={item.id}>{item.label}
                <span className='text-end' onClick={()=>deleteLi(index)}>X</span>
              </li>
            ))}
          </ul>
          <p className='paper'>{list.length} item left</p>

        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};