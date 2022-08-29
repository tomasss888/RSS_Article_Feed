import { Card, Spinner, Col } from 'react-bootstrap';
import "./articleCard.css"
import Moment from 'react-moment';
import 'moment/locale/lt';

const ArticleCard = props => {

    return (

        <>
            <div className="g-4 d-flex align-items-top image-container" >

                <div className='row'>
                    <CardMain
                        data={props.articles}
                        setSelectedArticleData={props.setSelectedArticleData}
                        setOpen={props.setOpen}
                    >
                    </CardMain>
                </div>
            </div>
        </>
    );
}

const CardMain = props => {

    return (
        <>
            {props.data.map((data, index) =>

                <Card
                    key={index}
                    className='Card'
                    onClick={() => (props.setSelectedArticleData(data), props.setOpen(true))}
                >
                    <Card.Img className='ImageCard' key={index} variant="top" src={data.image.url} />

                    <Card.Body>
                        <Card.Title className='CardTitle'> {data.title} </Card.Title>
                    </Card.Body>

                    <img className='logo' src={data.siteInfo.logo.url}></img>
                    <Moment className='TimeFromNow' locale="lt" parse="YYYY/MM/DD hh:mm:ss" fromNow>{data.pubDate}</Moment>

                </Card>

            )}
        </>
    )

}

export default ArticleCard;



