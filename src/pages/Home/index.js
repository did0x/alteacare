import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get_data } from "../../redux/actions/main";
import Card from '../../partials/Card';
import "./index.scss"

const Home = () => {
  const dispatch = useDispatch()
	useEffect(() => {
		dispatch(get_data())
	},[dispatch])
  const { data } = useSelector(
    (state) => ({
        data: state.main.data,
    }),
    shallowEqual
  );

    return (
      <div className='home'>
        <div className='home__container'>
          <div className='home__container__header'>
            <h1>Search Doctor, Make an Appointment</h1>
            <span>Discover the best doctors, clinic, and hospital the city nearest to you.</span>
          </div>
          <div className="home__container__search">
              <input type="text" name="keyword" id="keyword" placeholder="Keyword"/>
              <select name="select-hospital" id="select-hospital">
                <option >Select Hospital</option>
                <option value="Mitra Keluarga Bintaro">Mitra Keluarga Bintaro</option>
                <option value="Mitra Keluarga Kelapa Gading">Mitra Keluarga Kelapa Gading</option>
              </select>
              <select name="select-specialization" id="select-specialization">
                <option>Select Specialization</option>
                <option value="Spesialis Anak">Spesialis Anak</option>
                <option value="Spesialis Penyakit Dalam">Spesialis Penyakit Dalam</option>
                <option value="Spesialis Kebidanan dan Kandungan">Spesialis Kebidanan dan Kandungan</option>
              </select>
          </div>
          <div className='home__container__content'>
            { data && data.map((item) => (
              <div className="item">
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
                      {console.log(item)}
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