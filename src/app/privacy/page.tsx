import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03142A] text-[#FFFCCF]">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#FFFCCF]/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFFCCF]/5 blur-[160px]"
        aria-hidden
      />
      <main className="relative mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-[#FFFCCF]/80 underline-offset-4 hover:text-[#FFFCCF] hover:underline"
          >
            ← 返回首页
          </Link>
        </div>
        <div className="rounded-[28px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8 sm:p-12">
          <h1 className="text-4xl font-semibold text-[#FFFCCF] sm:text-5xl">隐私声明</h1>
          <p className="mt-4 text-sm text-[#FFFCCF]/80">最后更新：{new Date().toLocaleDateString("zh-CN")}</p>
          
          <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#FFFCCF]/90">
            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">1. 数据保护承诺</h2>
              <p className="mb-4">
                我们承诺保护您的隐私和数据安全。我们不会向任何第三方披露、出售或共享您的个人信息，除非法律要求或您明确授权。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">2. 我们收集的信息</h2>
              <p className="mb-4">
                我们仅收集提供服务所必需的信息，包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>您主动提供的联系信息（邮箱、电话、微信号等）</li>
                <li>账户信息和登录凭证</li>
                <li>使用服务时产生的必要数据</li>
                <li>技术信息（IP地址、设备信息等）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">3. 数据使用</h2>
              <p className="mb-4">
                我们使用您的信息仅用于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>提供和改进我们的服务</li>
                <li>与您沟通和提供客户支持</li>
                <li>确保服务安全和合规</li>
                <li>遵守法律法规要求</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">4. 您的权利</h2>
              <p className="mb-4">
                您有权随时：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>访问和查看您的个人数据</li>
                <li>修改或更正您的个人信息</li>
                <li>删除您的账户和所有相关数据</li>
                <li>撤回您对数据处理的同意</li>
                <li>要求我们提供您的数据副本</li>
              </ul>
              <p className="mt-4">
                如需行使上述权利，请通过 <Link href="mailto:help@sola.xin" className="underline-offset-4 hover:underline">help@sola.xin</Link> 联系我们。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">5. 数据安全</h2>
              <p className="mb-4">
                我们采用行业标准的安全措施来保护您的数据，包括：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>加密传输（HTTPS/TLS）</li>
                <li>安全的数据存储</li>
                <li>访问控制和身份验证</li>
                <li>定期安全审计和更新</li>
              </ul>
              <p className="mt-4">
                尽管我们采取了合理的安全措施，但无法保证数据的绝对安全。您在使用服务时也应注意保护自己的账户安全。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">6. 数据保留</h2>
              <p className="mb-4">
                我们仅在必要期间保留您的数据。当您删除账户或要求删除数据时，我们将在合理时间内删除您的个人信息，除非法律要求我们保留。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">7. 第三方服务</h2>
              <p className="mb-4">
                我们的服务可能包含第三方链接或服务。我们不对第三方的隐私做法负责，建议您查看第三方的隐私政策。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">8. 儿童隐私</h2>
              <p className="mb-4">
                我们的服务不面向18岁以下的儿童。我们不会故意收集儿童的个人信息。如发现我们收集了儿童信息，我们将立即删除。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">9. 政策更新</h2>
              <p className="mb-4">
                我们可能会不时更新本隐私声明。重大变更时，我们会在网站上发布通知。继续使用我们的服务即表示您接受更新后的政策。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#FFFCCF] mb-4">10. 联系我们</h2>
              <p className="mb-4">
                如对本隐私声明有任何疑问或需要行使您的权利，请通过以下方式联系我们：
              </p>
              <p>
                邮箱：<Link href="mailto:help@sola.xin" className="underline-offset-4 hover:underline">help@sola.xin</Link>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

