import React, {useEffect} from "react";
import loadjs from "loadjs";
import ReactGA from 'react-ga';

export default function CongratulationStep() {

  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  }, []);

  // useEffect(()=> {
  //   removejscssfile("/assets/js/personalLoanScript", "js");
  //   loadjs("/assets/js/personalLoanScript.js", () => {});
  // },[])

  // const removejscssfile = (filename, filetype) => {
  //   var targetelement =
  //     filetype === "js" ? "script" : filetype === "css" ? "link" : "none"; //determine element type to create nodelist from
  //   var targetattr =
  //     filetype === "js" ? "src" : filetype === "css" ? "href" : "none"; //determine corresponding attribute to test for
  //   var allsuspects = document.getElementsByTagName(targetelement);
  //   for (var i = allsuspects.length; i >= 0; i--) {
  //     //search backwards within nodelist for matching elements to remove
  //     if (
  //       allsuspects[i] &&
  //       allsuspects[i].getAttribute(targetattr) != null &&
  //       allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
  //     )
  //       allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
  //   }
  // };
  // main return
  return (
           <div className="formWrapper postSuccess">
            <h1>Congrats! your application is submitted Successfully!</h1>
             <div className="centerFlex">
             <img src="/assets/image/shortAppSuccess.svg" alt="shortAppSuccess post" />
             </div>
             <p style={{
             fontFamily: 'Basis Grotesque Pro',
             fontStyle: "normal",
             fontWeight: "500",
             fontSize: "24px",
             lineHeight: "31px",
             textAlign: "center",
             /* Supporting Color 3/Orange 100% */
             color: "#3F2355"
             }}>
             We have received your application. One of our agents will contact you via email or phone in 24 hours.
           </p>
           </div>
      )
}
