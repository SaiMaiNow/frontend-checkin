
const Register = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log('Register submitted')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h2 className="card-title text-center justify-center mb-3 sm:mb-4 text-lg sm:text-xl">Register - CheckIn Web</h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Create your account</p>

          <form onSubmit={handleRegister} className="flex flex-col gap-3 sm:gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">ชื่อจริง (First Name)</span>
              </label>
              <input
                type="text"
                placeholder="กรอกชื่อจริง"
                className="input input-bordered w-full focus:outline-none focus:border-primary text-sm sm:text-base"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">นามสกุล (Last Name)</span>
              </label>
              <input
                type="text"
                placeholder="กรอกนามสกุล"
                className="input input-bordered w-full focus:outline-none focus:border-primary text-sm sm:text-base"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">ชื่อเล่น (Nickname)</span>
              </label>
              <input
                type="text"
                placeholder="กรอกชื่อเล่น"
                className="input input-bordered w-full focus:outline-none focus:border-primary text-sm sm:text-base"
                required
              />
            </div>

            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register