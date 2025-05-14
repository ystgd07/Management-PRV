import logo from "@/assets/JobSync_logo.png";

export default function MainHeader() {
  return (
    <header className='flex sticky top-0 z-10 border-b bg-background px-4 py-3 items-center justify-center'>
      <div className='flex items-center'>
        <img src={logo} alt='JobSync Logo' className='h-17 w-auto mr-2' />
      </div>
    </header>
  );
}
