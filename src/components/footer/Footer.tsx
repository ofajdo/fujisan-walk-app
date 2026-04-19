import Reference from "./Reference";
import logo from "../../assets/logo.svg";

export default () => {
  return (
    <div className="mt-6 border-t-4 border-gray-600">
      <div className="flex flex-col items-center p-3">
        <img src={logo.src} className="max-w-48"></img>
        <p className="text-center">
          富士宮市の「歩く博物館」をデジタル化しています。
          <br></br>
          個人が独自に作成・運営しているサイトです。
        </p>
      </div>
      <div className="flex flex-wrap">
        <Reference></Reference>
        <div className="text-center text-sm p-3 pw-2 flex flex-col gap-2 flex-1">
          <div className="font-medium">ソースコード</div>
          <div>
            <a
              href="https://github.com/ofajdo/fujinomiya-walk-app/tree/main"
              className="px-4 py-2 inline-block text-center bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="text-center text-sm p-3 pw-2 flex flex-col gap-2 flex-1">
          <div className="font-medium">お問い合わせ</div>

          <div>
            <a
              href="https://forms.gle/zJRSSwhTBq5wFGPW6"
              className="px-4 py-2 inline-block text-center bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
