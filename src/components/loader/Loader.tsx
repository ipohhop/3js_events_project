// local
import loaderAnimation from "./loaderJSON.json";

// outer
import React, {FunctionComponent} from 'react';
import Lottie from "lottie-react";

interface OwnProps {
}

type Props = OwnProps;

const Loader: FunctionComponent<Props> = (props) => {

  return (
    <div className="loader_container">
      <Lottie animationData={loaderAnimation}/>
    </div>
  );
};

export default Loader;
