import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";
type State = {
  countaryName: string;
  loading: boolean;
};
interface IProps extends RouteComponentProps<any> {
  id?: string;
}
class Countary extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
  }
  state = {
    countaryName: "",
    loading: false,
  };

  getCountatyName = async (countryName: string) => {
        this.props.history.push({
          pathname: "countryDetail",
          state: { countryName: countryName },
        });   
  };
  
  render() {
    return (
      <Grid container justifyContent="center" spacing={4}>
        <h1>Enter country</h1>
        <Grid xs={8} item>
          <TextField
            placeholder="Enter Country"
            fullWidth
            name="countaryName"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({
                countaryName: event.target.value,
              });
            }}
            value={this.state.countaryName}
          />
        </Grid>
        <Grid xs={6} item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!this.state.countaryName}
            onClick={() => {
              this.getCountatyName(this.state.countaryName);
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Countary);
