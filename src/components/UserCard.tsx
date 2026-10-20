type UserInfo = {
  name: string;
  age?: number;
  isActive: boolean;
};

type Props = {
  userInfo: UserInfo;
};

function UserCard({ userInfo }: Props) {
  const status = userInfo.isActive ? "アクティブ" : "非アクティブ";
  return (
    <div className="flex w-full max-w-sm items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white">
        {userInfo.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-semibold text-zinc-100">{userInfo.name}</p>
        {userInfo.age !== undefined && (
          <p className="text-sm text-zinc-400">{userInfo.age} 歳</p>
        )}
      </div>
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
          userInfo.isActive
            ? "bg-emerald-500/10 text-emerald-300"
            : "bg-zinc-800 text-zinc-400"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            userInfo.isActive ? "bg-emerald-400" : "bg-zinc-500"
          }`}
        />
        {status}
      </span>
    </div>
  );
}

export default UserCard;
