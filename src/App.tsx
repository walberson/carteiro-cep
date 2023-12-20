import { useEffect, useState } from "react";
import "./App.css";

type Address = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

function App() {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<Address | undefined>();

  function fetchAddressByCep(cep: string) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => setAddress(data));
  }

  return (
    <div>
      <img
        style={{ width: "250px" }}
        src="https://play-lh.googleusercontent.com/PAq27s27KH4odIqh2ugqkCZcipLYrXqYPRQCKYOjqwgwS212t7tmYAhSnicyUaVy1Mw3"
        alt=""
      />
      <h1>Carteiro CEP</h1>

      <div>
        {address ? (
          <div>
            <h2>Endereço</h2>
            <p>
              {address.logradouro}, {address.bairro}
            </p>
            <p>
              {address.localidade} - {address.uf}
            </p>
            <button onClick={()=>setAddress(undefined)} style={{backgroundColor:'red'}}>Cancelar</button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
            }}
          >
            <h2>Digite o CEP para obter o endereço!</h2>

            <input
              onChange={(e) => setCep(e.target.value)}
              value={cep}
              style={{ padding: "10px", borderRadius: "30px" }}
              type="text"
            />
            <button
              onClick={() => fetchAddressByCep(cep)}
              style={{
                backgroundColor:
                  "hsl(121.97368421052632, 59.84251968503935%, 49.80392156862745%)",
                marginTop: "15px",
              }}
            >
              Buscar
            </button>
            <span>
              Este aplicativo foi desenvolvido para ajudar os carteiros a
              encontrar o endereço a partir do CEP
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
