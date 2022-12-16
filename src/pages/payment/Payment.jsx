import React from 'react'
import "./payment.css"
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Payment() {
    const milliseconds = new Date();
    const [fromAcc, setFromAcc] = useState("");
    const [sdId, setSdId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [modaltitle, setModalTitle] = useState("");
    const navigate = useNavigate();
    const url = "http://localhost:3000/transfer";

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            data: {
                fromAcc: fromAcc,
                sdId: sdId,
                amount: amount,
                description: description,
                token: Cookies.get('token'),
            },
            request: {
                requestId: uuidv4(),
                requestTime: milliseconds.getTime(),
            }
        }

        axios.post(url, JSON.stringify(values), config)
            .then(res => {
                
                
            })
            .catch(error => {
                setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                console.log(error);
            })
    }
    return (
        <>
            <div className='transferPage'>
                <div className='transferContainer'>
                    <div className='transferWraper'>
                        <h2>Chưc năng chuyển khoản</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='transferStyleInput'>
                                <label>Số tiền cần đóng</label>
                                <input type="number" name="amount" id="amount" required
                                    onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <div className='transferStyleInput'>
                                <label>Tới số tài khoản </label>
                                <input type="number" name="amount" id="amount" required
                                    onChange={(e) => setSdId(e.target.value)} />
                            </div>
                            <div className='transferStyleInput'>
                                <label>Lời nhắn</label>
                                <textarea type="text" name="description" id="description" required
                                    onChange={(e) => setDescription(e.target.value)}
                                    onBlur={e => {
                                        if (e.target.value.length >= 151)
                                            setErrorDescription("Lời nhắn không dài quá 150 ký tự!!!")
                                        else
                                            setErrorDescription("")
                                    }} />
                                <span className='textErrorMsg'>{errorDescription}</span>
                            </div>

                            <div className='transferSubmit'>
                                <span className='textErrorMsg'>{modaltitle}</span>
                                <button type="submit" className='btnButton btnTransfer'>Xác nhận</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Payment