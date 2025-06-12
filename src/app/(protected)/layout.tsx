const ProtectedLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <>
      <h1>Protected Layout</h1>
      {children}
    </>
  );
}
 
export default ProtectedLayout;