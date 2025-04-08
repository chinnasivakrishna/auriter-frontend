import "../utils/globals.css";
export default function ProductDemo() {
  return (
    <section className="product-demo">
      <div className="demo-content">
        {/* <div className="demo-features">
          <div className="feature">
            <span>Seamless connection to any interview meeting software</span>
          </div>
          <div className="feature">
            <span>Real-time transcription from interviewer</span>
          </div>
          <div className="feature">
            <span>Real-time and personalized suggestions for answers</span>
          </div>
        </div> */}
        <div className="demo-image">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03BmhKbukEVuYlqt0rEFJMwrvhbuu4.png"
            alt="Interview interface demo"
          />
        </div>
      </div>
    </section>
  );
}
