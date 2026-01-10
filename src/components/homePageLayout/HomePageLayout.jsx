import './HomePageLayout.css'

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    console.log("PAYLOAD: " + payload)
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error(error);
    return null;
  }
}

function HomeLayout() {
    const token = localStorage.getItem("token");
    const decoded = token ? decodeJWT(token) : null;
    const role = decoded?.role;
    console.log("ROLE: " + role)
    return (
    <>
        <div>
            <h1 id='titleofpage'>Hello Home</h1>
            {role === "TEACHER" && <p>This user is a teacher</p>}
            {role === "STUDENT" && <p>This user is a student</p>}
            {!role && <p>User role not available</p>}
        </div>
    </>
    )
}

export default HomeLayout;