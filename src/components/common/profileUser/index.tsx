export const Profile = (props: any) => {



  return (
    <div className="flex justify-start items-center gap-5 py-3 hover:bg-white/25 px-2 w-full">
      <div>
        <div className="relative">
          <img alt="" className="w-12 rounded" src={props.urlImg} />
          <span className="absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 bg-green-400 -top-1 -left-1"></span>
        </div>
      </div>
      <div>
        {props.name + " " + props.lastName}
      </div>
    </div>
  );
};
export default Profile;
