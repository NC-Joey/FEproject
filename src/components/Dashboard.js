import React, { useContext, useEffect, useState } from 'react'
import DashContext from '../myContext/DashContext'
import DataBlock from './DataBlock'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { BiHomeAlt, BiCategoryAlt, BiChalkboard, BiQuestionMark, BiUser, BiLogOut  } from "react-icons/bi";
import { RiLayoutMasonryFill, RiMenuFill, RiCloseLargeFill } from "react-icons/ri";
import TokenContext from '../myContext/TokenContext';

const Dashboard = () => {
  const {dash} = useContext(DashContext)
  const {token} = useContext(TokenContext)
  const navigate = useNavigate()
  const [top3, setTop3] = useState([])
  const [allStudents, setAll] = useState([])
  const [menu, setMenu] = useState(false)
  
  useEffect(()=> {
    const top3Url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/top_three_students"

    if (dash.admin_email === undefined) {
          toast.warning("Login to continue")
          navigate('/')
    } else {
      axios.get(top3Url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response=> {
        setTop3(response.data)
      })
      .catch(error => console.log(error))
    }
  }, [dash, navigate, token])

  useEffect(()=>{
    const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin/get_all_students"
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setAll(response.data)

    })
    .catch(error => console.log(error))
  }, [token])

  
  
  const handleMenu = () => {
    setMenu(!menu)
  } 
  
  return (
    <>
      <div className='d-flex px-0'>
        <div className='d-flex flex-column dashboard-menu-div ps-3 ps-lg-4 no-mobile'>
          <h5 className='text-white fw-normal py-4 py-lg-5 ps-1'>Yoruba Aloud</h5>
          <ul className='list-unstyled fw-medium text-white px-0'>
            <li className='rounded-start-5 py-2 mb-2 active'><BiHomeAlt className='data-icon me-4'/>Dashboard</li>
            <li className='rounded-start-5 py-2 mb-2'><BiCategoryAlt className='data-icon me-4' />Categories</li>
            <li className='rounded-start-5 py-2 mb-2'><BiChalkboard className='data-icon me-4' />Learning Materials</li>
            <li className='rounded-start-5 py-2 mb-2'><BiQuestionMark className='data-icon me-4' />Quiz</li>
            <li className='rounded-start-5 py-2 mb-2'><BiUser className='data-icon me-4' />Admin Profile</li>
            <li className='rounded-start-5 py-2 mb-2'><BiLogOut className='data-icon me-4' />Logout</li>
          </ul>
        </div>

        {menu && <aside className='d-flex flex-column offcanvas-menu-div position-absolute top-0 z-2 w-100 px-0 mobile'>
          <div className='text-white py-4 py-lg-5 d-flex justify-content-between px-3'>
          <h5 className='fw-normal'>Yoruba Aloud</h5>
          <RiCloseLargeFill className='fs-3' onClick={handleMenu} role='button' />
          </div>
          <ul className='list-unstyled fw-medium text-white pe-5'>
            <li className='rounded-end-pill py-2 mb-2 active'><BiHomeAlt className='data-icon ms-3 me-4 me-lg-5'/>Dashboard</li>
            <li className='rounded-5 py-2 mb-2'><BiCategoryAlt className='data-icon ms-3 me-4 me-lg-5' />Categories</li>
            <li className='rounded-5 py-2 mb-2'><BiChalkboard className='data-icon ms-3 me-4 me-lg-5' />Learning Materials</li>
            <li className='rounded-5 py-2 mb-2'><BiQuestionMark className='data-icon ms-3 me-4 me-lg-5' />Quiz</li>
            <li className='rounded-5 py-2 mb-2'><BiUser className='data-icon ms-3 me-4 me-lg-5' />Admin Profile</li>
            <li className='rounded-5 py-2 mb-2'><BiLogOut className='data-icon ms-3 me-4 me-lg-5' />Logout</li>
          </ul>
        </aside>}

        <div className='dashboard-div px-0'>
          <header className='position-sticky top-0 py-4 py-lg-5 px-3 bg-white d-flex gap-2 align-items-center'>
            <RiMenuFill className='fs-2 no-mobile' role='button'/> 
            <RiMenuFill className='fs-1 mobile' onClick={handleMenu} role='button'/> 
            <h3 className='m-0'>{dash.admin_email}</h3>
          </header>

          

          <section>
            <div className='d-flex flex-wrap justify-content-center column-gap-3 column-gap-sm-4 column-gap-lg-5 row-gap-3 row-gap-sm-4 pt-5 mb-5'>
              <DataBlock icon={<BiCategoryAlt />} title='Total Categories' count={dash.total_number_of_categories} />
              <DataBlock icon={<BiChalkboard />} title='Learning Materials' count={dash.total_number_of_learningmaterial}/>
              <DataBlock icon={<RiLayoutMasonryFill />} title='Total Subcategories' count={dash.total_number_of_subcategories}/>
              <DataBlock icon={<BiQuestionMark />} title='Total Quiz' count={dash.total_number_of_quize}/>
              <DataBlock icon={<BiUser />} title='Total Students' count={dash.total_number_of_students}/>
              <div className='data-block px-3 py-4 rounded-2'>
                <button type='button' className='btn btn-primary rounded-3 py-3 px-1 data-title w-100' data-bs-toggle="modal" data-bs-target="#topThreeModal">Top three students</button>

                <div className="modal fade" id="topThreeModal" tabIndex="-1" aria-labelledby="topThreeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="topThreeModalLabel">Top three students</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body row px-4">
                        <div className='col-8'>
                        <p className='fw-medium text-primary'>Name</p>
                        {top3.map(student => <p key={student.id}>{student.name}</p>)}
                        </div>
                        <div className='col text-center'>
                        <p className='fw-medium text-primary'>Score</p>
                        {top3.map(student => <p className='text-success' key={student.id}>{student.total_score}</p>)}
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='table-responsive px-3 px-md-4 px-xl-5 mb-5'>
            <table className='table table-bordered border-success text-nowrap'>
              <thead>
                <tr className='bg-primary text-white'>
                  <th className='px-2 py-2 fw-medium'>Name</th>
                  <th className='px-2 py-2 fw-medium'>Email</th>
                  <th className='px-2 py-2 fw-medium'>Phone Number</th>
                  <th className='px-2 py-2 fw-medium'>Position</th>
                  <th className='px-2 py-2 fw-medium'>Total Score</th>
                </tr>
              </thead>

              <tbody>

                {allStudents.map(student => <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone_number? student.phone_number: "--"}</td>
                <td>{student.position? student.position: "--"}</td>
                <td>{student.total_score? student.total_score: "--"}</td>
                </tr>)}

              </tbody>
            </table>
          </section>
        </div>
      </div>

      
    </>
  )
}

export default Dashboard
