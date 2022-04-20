import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get_data } from "../../redux/actions/main";
import "./index.scss"

const Home = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [hospitalSelected, setHospitalSelected] = useState("");
  const [specializationSelected, setSpecializationSelected] = useState("");
  const [doctorNameSubmitted, setDoctorNameSubmitted] = useState("");

  const { data } = useSelector(
    (state) => ({
        data: state.main.data,
    }),
    shallowEqual
  );

	useEffect(() => {
		dispatch(get_data());
	},[dispatch])

  useEffect(() => {
    let hospitalArr = [];
    let specializationArr = [];
    data.map((item)=> {
      setItems(items => [...items, item]);
      hospitalArr = [...hospitalArr, item.hospital[0].name];
      specializationArr = [...specializationArr, item.overview];
    })
    setHospital(Array.from(new Set(hospitalArr)));
    setSpecialization(Array.from(new Set(specializationArr)));
  }, [data])

  useEffect(() => {
    let temp = [...data];
    if (doctorNameSubmitted !== "") {
      temp = temp.filter(item => item.name.toLowerCase().includes(doctorNameSubmitted));
    }
    setItems(temp);
    if (hospitalSelected !== "")  {
      temp = temp.filter(item => item.hospital[0].name === hospitalSelected);
    }
    setItems(temp);
    if (specializationSelected !== "") {
      temp = temp.filter(item => item.overview === specializationSelected)
    } 
    setItems(temp)
      
	},[doctorNameSubmitted, hospitalSelected, specializationSelected])
  
  const handleHopsital = (event) => {
    setHospitalSelected(event.target.value);
  }

  const handleSpecialization = (event) => {
    setSpecializationSelected(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setDoctorNameSubmitted(event.target.value);
    }
  }
    return (
      <div className='home'>
        <div className='home__container'>
          <div className='home__container__header'>
            <h1>Search Doctor, Make an Appointment</h1>
            <span>Discover the best doctors, clinic, and hospital the city nearest to you.</span>
          </div>
          <div className="home__container__search">
            <input type="text" name="keyword" id="keyword" placeholder="Keyword" onKeyDown={handleKeyDown}/>
            <select defaultValue={""} onChange={handleHopsital}>
              <option value={""}>Semua Rumah Sakit</option>
              { hospital && hospital.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <select defaultValue={""} onChange={handleSpecialization}>
              <option value={""}>Semua Spesialisasi</option>
              { specialization && specialization.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className='home__container__content'>
            { items && items.map((item) => (
              <div className="item" key={item.doctor_id}>
                <div className="item__container">
                  <div className="item__photo">
                    <img
                      className="item__photo__img"
                      src={item.photo.url}
                      alt="Item"
                    />
                  </div>
                  <div className="item__name">
                      {item.name}
                  </div>
                  <div className="item__detail">
                      {item.overview}
                  </div>
                </div>
                <div className="item__info">
                  <div className="item__info__about" dangerouslySetInnerHTML={{__html: item.about}}></div>
                  <div className="item__info__work">
                    Bekerja di {item.hospital[0].name}
                  </div>
                  <div className="item__info__price">
                    {item.price.formatted}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default Home;