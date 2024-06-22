import React from 'react';
import './Styles/Staff.css';
import { picon1 } from '../assets';
import { Link } from 'react-router-dom';
function Staff() {
  return (
    <>
      <h2 className='dash'>DASHBOARD</h2>
      <div className="card-container">
        <br />
        <Link to="/qrgenerator">
          <div class="card wallet">
            <div class="overlay"></div>
            <div class="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 -960 960 960"
                height="60px"
                width="78px"
                fill="#e8eaed"
              >
                <defs></defs>
                <g
                  transform="translate(0, 0)"
                  fill-rule="evenodd"
                  fill="none"
                  stroke-width="1"
                  stroke="none"
                  id="icon"
                >
                  <path
                    d="M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 80v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm360-280v-80h80v80h-80ZM180-660h120v-120H180v120Zm-60 60v-240h240v240H120Zm60 420h120v-120H180v120Zm-60 60v-240h240v240H120Zm540-540h120v-120H660v120Zm-60 60v-240h240v240H600Zm80 480v-120h-80v-80h160v120h80v80H680ZM520-400v-80h160v80H520Zm-160 0v-80h-80v-80h240v80h-80v80h-80Zm40-200v-160h80v80h80v80H400Zm-190-90v-60h60v60h-60Zm0 480v-60h60v60h-60Zm480-480v-60h60v60h-60Z"
                    fill="#e8eaed"
                    id="icon-path"
                  ></path>
                </g>
              </svg>
            </div>
            <p>Qr Generator</p>
          </div>
        </Link>
        <Link to="/order-display">
          <div class="card wallet">
            <div class="overlay"></div>
            <div class="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 -960 960 960"
                height="60px"
                width="78px"
                fill="#e8eaed"
              >
                <defs></defs>
                <g
                  transform="translate(0, 0)"
                  fill-rule="evenodd"
                  fill="none"
                  stroke-width="1"
                  stroke="none"
                  id="icon"
                >
                  <path
                    d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"
                    fill="#e8eaed"
                    id="icon-path"
                  ></path>
                </g>
              </svg>
            </div>
            <p>Orders</p>
          </div>
        </Link>
        <Link to="/products">
          <div class="card wallet">
            <div class="overlay"></div>
            <div class="circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 -960 960 960"
                height="60px"
                width="78px"
                fill="#e8eaed"
              >
                <defs></defs>
                <g
                  transform="translate(0, 0)"
                  fill-rule="evenodd"
                  fill="none"
                  stroke-width="1"
                  stroke="none"
                  id="icon"
                >
                  <path
                    d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"
                    fill="#e8eaed"
                    id="icon-path"
                  ></path>
                </g>
              </svg>
            </div>
            <p>Inventory</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Staff;
