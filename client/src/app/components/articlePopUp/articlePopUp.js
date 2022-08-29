import { Card, Spinner, Button, Modal } from 'react-bootstrap';
import "./articlePopUp.css"
import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import 'moment/locale/lt';

const ArticlePopUp = props => {

    // Hooks
    const [articleData, getArticleData] = useState(undefined)

    // Abort controller, allows aborting previous API call before starting next
    const controller = new AbortController();
    const signal = controller.signal;

    // Get Article Data from API
    const getData = () => {
        fetch(`http://localhost:3000/getArticle?link=${props.selectedArticleData.link}&target=${props.selectedArticleData.siteInfo.title}`, {
            method: 'get',
            signal: signal,
        })
            .then((res) => res.json())
            .then((res) => {
                getArticleData(res)
            })
            .catch((err) => {
                console.error(` Err: ${err}`);
            });
    }

    // handles modal article window on close
    const handleClose = () => {
        props.setOpen(false);
        getArticleData(undefined);
        controller.abort(); // cancels previous fetch request
    }

    // Calls getData if modal windows becomes open
    useEffect(() => {
        if (props.open)
            getData()
    }, [props.open])

    return (

        <>
            <Modal
                className="modal"
                aria-labelledby="contained-modal-title-vcenter"
                show={props.open}
                onHide={() => props.setOpen(false)}
                backdrop="static"
                centered
            >
                <Button variant="secondary" className='close' onClick={() => handleClose()}>
                    Uždaryti
                </Button>

                {(articleData !== undefined) ? (
                    <>
                        <Card.Img className="img-fluid ImageArticle" src={(articleData.image === undefined) ? null : articleData.image.url} />

                        <Modal.Header className="header">
                            <h2>
                                {articleData.title}
                            </h2>
                        </Modal.Header>
                        <Modal.Body
                            className="content"
                        > {' '}
                            <h3>{articleData.description}</h3>
                            {(articleData.article === undefined) ? null : articleData.article.map((data, index) =>
                                <>
                                    <div className='ArticleMain'>
                                        {data}
                                        <br />
                                    </div>
                                </>
                            )}
                        <a href={articleData.link} target="_blank">Nuoroda į straipsnį</a>

                        </Modal.Body>
                        <Modal.Footer className='ModalFooter'>
                            <img className='logoArticle' src={props.selectedArticleData.siteInfo.logo.url} alt={props.selectedArticleData.siteInfo.title}></img>
                            <p className='authorName'>{articleData.author}</p>
                            <Moment className=' dateArticle' format="YYYY-MM-DD HH:mm" >{articleData.pubDate}</Moment>
                        </Modal.Footer>
                    </>
                ) : (
                    <>
                        <div className='spinnerParent'>
                            <Spinner animation="border justify-content-center" />
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

export default ArticlePopUp;



