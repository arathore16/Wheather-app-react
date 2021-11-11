import React from "react";
import { withRouter,RouteComponentProps } from "react-router";
import { api_key } from "../../config";
import {
  Container,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

type State = {
    loading : boolean,
    countryDetail : any,
    wheatherDetail: any
}
type Props = RouteComponentProps & {
    id? : string
} 
type CustomizedState = {
    countryName : string
}
class CountaryDetail extends React.Component<Props,State>{
    constructor(props : Props){
        super(props)
        this.state = {
            loading : false,
            countryDetail : [],
            wheatherDetail: null
        }
    }
   async componentDidMount(){
        const {history} = this.props;
        const {location} = history;
        const state = location?.state as CustomizedState;
        const country = state?.countryName;
    
        try {
        let url = `https://restcountries.com/v3.1/name/${country}`
        const response = await fetch(url);
        const jsondata = await response.json();
        this.setState({
            countryDetail : jsondata,
            loading : false
        }) 
        } catch (error) {
            this.setState({
                countryDetail : [],
                loading : false
            })         
        }
    }

    getWheatherInfo = async () => {
      const {history} = this.props;
      const {location} = history;
      const state = location?.state as CustomizedState;
      const country = state?.countryName;
  
      try {
        let url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`
        const response = await fetch(url);
        const wheatherData = await response.json();
        this.setState({
            wheatherDetail : wheatherData,
            loading : false
        }) 
        } catch (error) {
            this.setState({
              wheatherDetail : [],
              loading : false
            })         
        }
    }
    
    
    render(){
      console.log(this.state.wheatherDetail, "wheatherDetail")
        return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            {/* Table to render the data */}
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Capital</TableCell>
                    <TableCell>Latlng</TableCell>
                    <TableCell>Flag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {this.state?.countryDetail.length > 0 ? 
                  <TableRow>
                  {this.state.countryDetail.map((countryData:any) => {
                    return (
                      <>
                    <TableCell>{countryData.capital}</TableCell>
                    <TableCell>{countryData.latlng}</TableCell>
                    <TableCell><img src={countryData?.flags?.png} style={{height:'60px', width:'60px'}}/></TableCell>
                    </>
                    );
                  }
                )}
              </TableRow>
              : null }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Button onClick={() => this.getWheatherInfo()}>Weather capital</Button>
        <Grid container>
          <Grid item xs={12}>
          <Card>
          {this.state.wheatherDetail ?
             <CardActionArea>
                 <CardMedia
                  component="img"
                  alt="Country Flag"
                  height="40"
                  style={{width : '90px'}}
                  image={this.state.wheatherDetail?.current?.weather_icons[0]}
                  title="Flag"
                />
                <CardContent>
                 {this.state.wheatherDetail ? <><Typography gutterBottom variant="h5" component="h2">
                  Temperature : {this.state.wheatherDetail?.current?.temperature} 
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                  Wind_speed : {this.state.wheatherDetail?.current?.wind_speed}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                  Precip : {this.state.wheatherDetail?.current?.precip}
                  </Typography> </>: <Typography>No Capital selected</Typography>} 
                </CardContent>
          </CardActionArea>
        : null }
        </Card>
        </Grid>
        </Grid>
      </Container>
        );
    }
}

export default withRouter(CountaryDetail);