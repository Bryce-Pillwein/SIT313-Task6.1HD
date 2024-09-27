import LayoutDefault from "@/components/layout/LayoutDefault";


export default function FAQPage() {

  return (
    <LayoutDefault>
      <main className="mt-8">
        <h1 className="font-semibold text-3xl ml-4">Devs @ Deakin FAQ</h1>

        <div className="flex justify-center items-center mt-4 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">
          <div className="w-full max-w-[100%] sm:max-w-[80%] md:max-w-[70%]">

            <h1 className="font-medium mt-6 text-lg">What is Devs @ Deakin?</h1>
            <p className="text-hsl-l50 text-sm">Devs @ Deakin is a student portal designed to help users create and share articles, post questions, upload videos, and engage with the community. It also offers profile customisation and paid subscription options for additional features.</p>

            <h1 className="font-medium mt-6 text-lg">How do I create an article or post a question?</h1>
            <p className="text-hsl-l50 text-sm">To create an article or post a question, simply log in to your account, navigate to the &#34;Create&#34; section, and choose between writing an article or asking a question. Fill in the required details, and hit &#34;Submit&#34; to share it with the community.</p>

            <h1 className="font-medium mt-6 text-lg">Can I upload videos?</h1>
            <p className="text-hsl-l50 text-sm">Yes, you you can upload videos in guides. Go to Post and &#34;Upload Guide&#34;.</p>

            <h1>How can I customise my profile?</h1>
            <p className="text-hsl-l50 text-sm">To customise your profile, go to the &#34;Profile&#34; section after logging in. You can update your profile picture, bio, contact information, and other personal details to reflect your personality and interests.</p>

            <h1 className="font-medium mt-6 text-lg">What are the benefits of a paid subscription?</h1>
            <p className="text-hsl-l50 text-sm">A paid subscription unlocks additional features such as profile customisation and extra code blocks when creating posts.</p>

            <h1 className="font-medium mt-6 text-lg">How do I subscribe to the paid membership?</h1>
            <p className="text-hsl-l50 text-sm">To subscribe, click on the Pricing Plans. Choose your preferred plan, enter your payment details, and enjoy the exclusive benefits of the premium membership.</p>

            <h1 className="font-medium mt-6 text-lg">How can I interact with other users on the platform?</h1>
            <p className="text-hsl-l50 text-sm">You can interact with other users by commenting on their posts, answering questions, and sending direct messages.</p>

            <h1 className="font-medium mt-6 text-lg">Can I edit or delete my posts after publishing?</h1>
            <p className="text-hsl-l50 text-sm">Yes, you can edit or delete your articles and question posts. Navigate to your posts, find the post you want to edit or delete, and click on the respective button to make the changes.</p>

            <h1 className="font-medium mt-6 text-lg">What should I do if I encounter inappropriate content?</h1>
            <p className="text-hsl-l50 text-sm">If you encounter inappropriate content, click on the &#34;Report&#34; button available on the post or comment. Our moderation team will review the content and take appropriate action.</p>

            <h1 className="font-medium mt-6 text-lg">Can I link my Devs @ Deakin profile to my social media accounts?</h1>
            <p className="text-hsl-l50 text-sm">Yes, you can link your profile to your social media accounts in the &#34;Profile&#34; section. This allows you to share your content directly to platforms like LinkedIn, Twitter, and Facebook.</p>

          </div>
        </div>
      </main>
    </LayoutDefault>
  );
}