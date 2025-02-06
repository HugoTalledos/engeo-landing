import { firebaseRef } from '../firebase/firebase';
import { signInAnonymously } from 'firebase/auth';
import { createRef } from 'preact';
import { useState } from "preact/hooks";
import './form-styles.css';

const FormContact = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const email = createRef();
  const service = createRef();
  const subject = createRef();
  const details = createRef();

  const authenticateAnonymously = async () => {
      const auth = firebaseRef.auth();
      try {
          const userCredential = await signInAnonymously(auth);
          const user = userCredential.user;
          return user.getIdToken();
      } catch (error) {
          console.error("Error en autenticación anónima:", error);
      }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = email.current.value;
    const currentSubject = subject.current.value;
    const currentDetail = details.current.value;
    const currentService = service.current.value;

    const body = {
      currentUser,
      currentSubject,
      currentDetail,
      currentService,
    }

    const token = await authenticateAnonymously();

    try {
      const apiResponse = await fetch('https://us-central1-landing-engeo.cloudfunctions.net/v1/contact', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body), 
      });

      const status = apiResponse.status;
      const response = await apiResponse.text();
      
      setError(status !== 200);
      setMessage(response);
    } catch (e) {
      setError(true);
      setMessage("Error inesperado, intente más tarde");
    }  finally {
      setTimeout(() => setMessage(''), 3000);
    }
  }

  return(
    <form onSubmit={handleSubmit} class="flex flex-col h-[500px] w-full gap-[10px]" id="contact-us-form" method="POST">
      <label for="user-email">Tu correo: </label>
      <input type="email" name="user-email" ref={email} required/>
      <label for="services">¿Quieres cotizar algun servicio?</label>
      <select name="services" ref={service} required>
        <option value="NA">------------------</option>
        <option value="ing-geo">Ingeniería Geotécnica</option>
        <option value="ing-ro">Ingenierpia de Rocas</option>
        <option value="geo">Geología</option>
        <option value="top">Topografía</option>
        <option value="lab-ing">Laboratorios de Ingeniería</option>
        <option value="agu-po">Aguas Subterráneas y Pozos profundos</option>
        <option value="ing-via">Ingeniería Vial</option>
        <option value="ing-hi">Ingeniería Hidráulica</option>
        <option value="ing-es">Ingeniería Estructural</option>
        <option value="geomatica">Geomática</option>
        <option value="obras-civi">Obras Civiles</option>
      </select>
      <label for="subject">¿Cómo podemos ayudarte?</label>
      <input type="text" name="subject" ref={subject} required/>
      <label for="details">Brindanos más detalles</label>
      <textarea name="details" ref={details} required></textarea>
      <button type="submit">Enviar</button>
      <p class={error ? 'error-message' : 'success-message'}>{ message }</p>
    </form>
  );
};

export default FormContact;
