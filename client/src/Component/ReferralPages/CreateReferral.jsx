import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuid } from "uuid";

const CreateReferral = () => {
  const hospName = sessionStorage.getItem('hospName');
  const [credentials, setCredentials] = useState([]);
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    ref_id: uuid(),
    patient_id: id,
    hospName: hospName,
    pa_prblm: "",
    prlm_start: "",
  });

  const scheduleValues  = {
    schedule_id: sessionStorage.getItem('schedule_id'),
    date: sessionStorage.getItem('date'),
    time: sessionStorage.getItem('time'),
    hospital: hospName,
    hospitalFrom: sessionStorage.getItem('to'),
    patient_id: id,
    patientName: sessionStorage.getItem('patientName'),
    email: credentials.email,
    phone_no: credentials.phone_no,
  };

  console.log(scheduleValues)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    getHospitalCredentials();
  }, []);

  const getHospitalCredentials = async () => {
    await axios
      .get(`http://localhost:8800/hospital/get/credentials?term=${hospName}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setCredentials(res.data.Result[0]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/schedule/add",
        scheduleValues
      ).then(res => {
        if (res.data.Status === "Success") {
          navigate("/dashboard/view/patient");
          toast.success(res.data.Message);
          setTimeout(() => {
            axios.post("http://localhost:8800/referral/add", inputs).then(res => {
              if (res.data.Status === "Success") {
                toast.success(res.data.Message);
              } else {
                toast.warning(res.data.Message);
              }
            })
          },5000)
        } else {
          navigate(`/dashboard/create/referral/${id}`);
          toast.warning(res.data.Message);
        }
      })    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="conatiner p-5 m-5">
      <Link to={`/dashboard/patient/schedule/${id}`} className="px-0">
        <button className="btn btn-sm btn-lg btn-primary">BACK</button>
      </Link>

      <div className="row g-0">
        <div className="col-2"></div>
        <div className="card h-50 border-0 col-8">
          <div className="card-header bg-info">
            <h1 className="text-center fs-2 fw-bold">Patient Referral Form</h1>
          </div>
          <div className="card-body p-3 shadow-lg border-0 bg-light">
            <form onSubmit={handleSubmit} className="form">
              <h2 className="text-primary text-center text-decoration-underline mb-4">
                Reason for Referral
              </h2>
              <div className="row mb-5">
                <label htmlFor="pa_prblm" className="col-form-label fw-bold">
                  Problems the Patient Has:
                </label>

                <div className="col-12">
                  <textarea rows={5} className="form-control" name="pa_prblm" id="pa_prblm" onChange={handleChange} required></textarea>
                </div>
              </div>
              <div className="row">
                <label htmlFor="prlm_start" className="col-form-label fw-bold">
                  When did the problem start:
                </label>

                <div className="col-12">
                  <select
                    className="form-select text-center"
                    id="prlm_start"
                    name="prlm_start"
                    onChange={handleChange}
                    required
                  >
                    <option className="text-muted" defaultValue={"Uknown"}>
                      Select Here
                    </option>
                    <option value={"Wakati wa Kuzaliwa"}>
                      Wakati wa Kuzaliwa
                    </option>
                    <option value={"Baada ya Kuzaliwa"}>
                      Baada ya Kuzaliwa
                    </option>
                  </select>
                </div>

                <div className="col mt-5">
                  <label htmlFor="hospName" className="form-label fw-bold">
                    Hospital to Assign:
                  </label>
                  <input
                  type="text"
                  className="form-control text-uppercase"
                  id="hospName"
                  name="hospName"
                  readOnly
                  value={hospName}
                  required
                />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-info fw-bold mt-4 p-2">
                  schedule & Request to Assign
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default CreateReferral;
