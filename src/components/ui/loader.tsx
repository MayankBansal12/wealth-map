import loaderSvg from '../../assets/loader.svg'

const Loader = () => (
  <div className="w-full h-svh flex justify-center items-center gap-2">
    <img src={loaderSvg} alt="" className="w-5 h-5" />
    <span>loading...</span>
  </div>
)

export { Loader }
