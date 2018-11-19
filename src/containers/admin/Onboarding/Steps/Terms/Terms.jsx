import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose } from 'recompose'
import reconnect from 'utils/reconnect'
import StepLayout from '../../StepLayout'
import * as ACTIONS from '../../actions'

const CONTENT_WIDTH = 700

const styles = theme => ({
  root: {
    paddingBottom: 200,
    textAlign: 'left',
    '& b': {
      fontWeight: 500,
      color: '#252B43',
    },
    // ordered list
    '& ol': {
      paddingInlineStart: '17px',
      // every list item
      '& > li': {
        marginTop: 15,
      },
    },
    // ordered list item
    '& li': {
      paddingLeft: 15,
      marginTop: 35,
      // nested ordered list padding
      '& > ol': {
        marginTop: 30,
        marginBottom: 35,
      },
    },
  },
  title: {
    color: '#252B43',
    ...theme.fontSemibold(40, 46),
    width: CONTENT_WIDTH,
  },
  company: {
    width: CONTENT_WIDTH,
    marginTop: 25,
    color: 'rgba(32, 40, 74, 0.5)',
    ...theme.fontRegular(16, 26),
  },
  subtitle: {
    width: CONTENT_WIDTH,
    color: '#252B43',
    ...theme.fontMedium(22, 26),
    marginTop: 55,
    marginBottom: 20,
  },
  text: {
    width: CONTENT_WIDTH,
    color: 'rgba(37, 43, 67, 0.7)',
    ...theme.fontRegular(16, 26),
  },
  orderedListNested: {},
})

const nextButtonProps = { width: 250 }

const Terms = ({ className, classes, ...props }) => (
  <StepLayout
    nextLabel="I agree to the Terms"
    nextButtonProps={nextButtonProps}
    canGoNext
    className={cx(classes.root, className)}
    {...props}
  >
    <div className={classes.title}>
      Terms of service
      <br />
      for Open Frank account
    </div>
    <div className={classes.company}>
      Last revised on <b>October 20, 2015</b>
      <br />Frank Money, Inc PO Box 2757
      <br />S.F. CA 94126-2757
    </div>
    <div className={classes.subtitle}>Welcome to Frank!</div>
    <div className={classes.text}>
      Frank is an innovative, transparent ledger that strengthens the connection
      between donors and social ventures, including nonprofits, crowdfunding
      projects, and much more. Open Frank Account allows general public to see
      how each and every dollar of a transparent venture is being used, while
      also providing a social channel for the public to communicate with the
      organization. Open finances translate to more trust, better relationships,
      and more causes funded and populations served. Frank is more than an app;
      it’s a movement. Join us today!
      <br />
      <br />
      IMPORTANT — READ CAREFULLY BEFORE USING THIS SOFTWARE: THESE TERMS OF
      SERVICE (“Terms”) AS SET FORTH IN THIS TERMS OF SERVICE FOR OPEN FRANK
      ACCOUNT AGREEMENT (“Agreement”), AS AMENDED FROM TIME TO TIME, ARE A
      BINDING CONTRACT BETWEEN YOU, WHETHER PERSONALLY OR ON BEHALF OF AN ENTITY
      (the “Customer” or “you”) AND FRANK MONEY, INC. (the “Company”, or “we”,
      or “Frank”), A DELAWARE CORPORATION. THESE TERMS ARE GOVERNED BY THE LAWS
      OF THE STATE OF CALIFORNIA.
      <br />
      <br />
      THIS TERMS IS EFFECTIVE AS OF THE DATE ON WHICH YOU FIRST CONNECTS YOUR
      BANK ACCOUNT TO FRANK SERVICES THROUGH THE FRANK ONLINE ONBOARDING
      PROCEDURE (“Onboarding”). IF YOU ARE ACCEPTING ON BEHALF OF YOUR EMPLOYER
      OR ANOTHER ENTITY, YOU REPRESENT AND WARRANT THAT (I) YOU HAVE FULL LEGAL
      AUTHORITY TO BIND YOUR EMPLOYER OR THE APPLICABLE ENTITY TO THESE TERMS;
      (II) YOU HAVE READ AND UNDERSTOOD THESE TERMS; AND (III) YOU AGREE, ON
      BEHALF OF THE PARTY THAT YOU REPRESENT, TO THESE TERMS. THIS AGREEMENT
      GOVERNS CUSTOMER’S USE OF THE COMPANY’S SERVICES IN CONNECTION WITH THE
      USE OF CUSTOMER’S OPEN FRANK ACCOUNT, INCLUDING THE FRANK.LY WEBSITE
      (INCLUDING ANY SUCCESSOR SITE, AND THEIR PARTS, INCLUDING ONBOARDING) (the
      “Website”), THE MOBILE APPLICATIONS, FEATURES OR FUNCTIONALITY AND
      SOFTWARE (COLLECTIVELY, the “Frank Services”), BEFORE USING THE FRANK
      SERVICES. BY ESTABLISHING YOUR OPEN FRANK ACCOUNT, OR OTHERWISE USING THE
      FRANK SERVICES IN CONNECTION WITH YOUR OPEN FRANK ACCOUNT, YOU AGREE TO
      THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT ESTABLISH YOUR
      OPEN FRANK ACCOUNT.
      <br />
      <br />
      We may change the terms governing the use of Open Frank Accounts and/or
      may terminate or discontinue any of the Frank Services at any time and at
      the Company’s sole discretion.
    </div>
    <div className={classes.subtitle}>Your Responsibilities</div>
    <div className={classes.text}>
      You represent that you own or otherwise have the rights to all information
      and data that you provide to Frank pursuant to your Open Frank Account;
      that such information is accurate and complete; that such information is
      not slanderous, defamatory, violative of any third party’s proprietary
      rights (including any right to privacy or publicity); and that such
      information or the provision thereof to Frank does not violate any
      federal, state or local law or regulation. You agrees that you will, on a
      continuous basis during the term of these Terms maintain your Open Frank
      Account and its community by answering to the comments as necessary,
      categorizing transactions, adding additional information to the
      transactional data uploaded automatically as necessary to ensure that it
      remains accurate. Although Company has no obligation to monitor Customer’s
      use of the Frank Services, Company may do so and may prohibit any use of
      the Frank Services it believes may be (or alleged to be) in violation of
      the foregoing.
      <br />
      <br />
      Customer shall be responsible for obtaining and maintaining any equipment
      and ancillary services needed to connect to, access or otherwise use the
      Frank Services, including, without limitation, modems, hardware, servers,
      software, operating systems, networking, web servers and the like
      (collectively, “Equipment”). Customer shall also be responsible for
      maintaining the security of the Equipment, Customer account, passwords
      (including but not limited to administrative and user passwords) and
      files, and for all uses of Customer account or the Equipment with or
      without Customer’s knowledge or consent.
    </div>
    <div className={classes.subtitle}>License to Use Your Information</div>
    <div className={classes.text}>
      Customer hereby grants to Company a non-exclusive, royalty free,
      worldwide, perpetual license to (a) use, reproduce, distribute, create
      derivative works of, perform and display the information provided by
      Customer (“Customer Information”) in connection with the development,
      operation and maintenance of Frank Services; and (b) to modify, sell,
      publish, transmit, reformat, excerpt, distribute and otherwise use the
      Customer Information in connection with Frank Services, Website, and other
      products and services offered by Company (whether through the Website,
      Frank mobile applications or via other channels or media) to end users
      including, without limitation through the Frank mobile applications, and
      for sector-specific reports. Company shall have the sole discretion to
      determine how to display, format and otherwise make the Customer
      Information available via the Website, Frank mobile applications and other
      Company products and services.
    </div>
    <div className={classes.subtitle}>Our Fees</div>
    <div className={classes.text}>
      For Frank Services offered on a payment or subscription basis, the
      following terms apply, unless Company notifies you otherwise in writing.
      This Agreement also incorporates by reference and includes program
      ordering and payment terms provided to you on the Website:
      <br />
      <br />
      <ol className={classes.orderedList}>
        <li>
          Payments will be billed to you in U.S. dollars, and your account will
          be debited when you subscribe and provide your payment information,
          unless stated otherwise in the program ordering or payment terms on
          the Website.
        </li>
        <li>
          You must pay with one of the following:
          <ol className={classes.orderedListNested}>
            <li>A valid credit card acceptable to Frank;</li>
            <li>A valid debit card acceptable to Frank;</li>
            <li>
              Sufficient funds in a checking or savings account to cover an
              electronic debit of the payment due; or
            </li>
            <li>By another payment option Frank provides to you in writing.</li>
          </ol>
        </li>
        <li>
          If your payment and registration information is not accurate, current,
          and complete and you do not notify us promptly when such information
          changes, we may suspend or terminate your Frank account.
        </li>
        <li>
          If you do not notify us of updates to your payment method (e.g.,
          credit card expiration date), to avoid interruption of your service,
          we may participate in programs supported by your card provider (e.g.,
          updater services, recurring billing programs, etc.) to try to update
          your payment information, and you authorize us to continue billing
          your account with the updated information that we obtain.
        </li>
        <li>
          Company will automatically renew your monthly, quarterly, or annual
          services at the then-current rates, unless the services are cancelled
          or terminated under this Agreement.
        </li>
        <li>
          Additional cancellation or renewal terms may be provided to you on the
          Website.
        </li>
        <li>
          Fees are not eligible for any proration of unused subscriptions or
          refunds.
        </li>
      </ol>
    </div>
    <div className={classes.subtitle}>Termination</div>
    <div className={classes.text}>
      Frank may immediately, in its sole discretion and without notice terminate
      this Agreement. Upon termination Frank stops uploading and providing
      opportunity for Customer Information upload and any outstanding payments
      will become due. Any termination of this Agreement shall not affect
      Company’s rights to any payments due to it. Frank may terminate a free
      account at any time.
      <br />
      <br />
      You may terminate this Agreement upon ten (10) days’ notice.
      <br />
      <br />
      Upon termination Frank may in its sole discretion delete Customer
      Information from Frank Services.
      <br />
      <br />
      All sections of this Agreement which by their nature should survive
      termination will survive termination.
    </div>
    <div className={classes.subtitle}>Use with Your Mobile Device</div>
    <div className={classes.text}>
      Use of these services may be available through a compatible mobile device,
      Internet access and may require software. You agree that you are solely
      responsible for these requirements, including any applicable changes,
      updates and fees as well as the terms of your agreement with your mobile
      device and telecommunications provider.
      <br />
      <br />
      COMPANY MAKES NO WARRANTIES OR REPRESENTATIONS OF ANY KIND, EXPRESS,
      STATUTORY OR IMPLIED AS TO THE AVAILABILITY OF TELECOMMUNICATION SERVICES
      FROM YOUR PROVIDER AND ACCESS TO THE SERVICES AT ANY TIME OR FROM ANY
      LOCATION; ANY LOSS, DAMAGE, OR OTHER SECURITY INTRUSION OF THE
      TELECOMMUNICATION SERVICES; AND ANY DISCLOSURE OF INFORMATION TO THIRD
      PARTIES OR FAILURE TO TRANSMIT ANY DATA, COMMUNICATIONS OR SETTINGS
      CONNECTED WITH THE SERVICES.
    </div>
    <div className={classes.subtitle}>Limitation of Warranty and Liability</div>
    <div className={classes.text}>
      <b>No Warranty of Accuracy.</b> Frank does not warrant or guarantee the
      accuracy, quality, completeness, currency, or validity of any information
      available through the Frank Services or linked from the Frank Services.
      Transactional data is derived from bank statements provided by the
      Customer’s bank or added by the Customer and is displayed as it is. Frank
      does not edit or control the financial information it receives, although
      it may (in its sole discretion) note obvious mathematical errors that it
      believes may exist in the materials as received by it. Certain areas of
      the Frank Services provide end users the ability to submit content such as
      comments. Frank does not warrant and expressly disclaims responsibility
      for such third party user generated content, including the accuracy or
      completeness of such content. FRANK DOES NOT WARRANT THAT THE SERVICES
      WILL BE UNINTERRUPTED OR ERROR FREE; NOR DOES IT MAKE ANY WARRANTY AS TO
      THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES. EXCEPT AS
      EXPRESSLY SET FORTH IN THIS SECTION, THE SERVICES AND IMPLEMENTATION
      SERVICES ARE PROVIDED “AS IS” AND COMPANY DISCLAIMS ALL WARRANTIES,
      EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
      MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
      <br />
      <br />
      <b>Warranty Disclaimer.</b> CUSTOMER ACKNOWLEDGES THAT FRANK IS NOT AND
      WILL NOT BE LIABLE FOR ANY DAMAGES RESULTING FROM OR IN CONNECTION WITH
      THE USE OF THE FRANK SERVICES.
      <br />
      <br />
      <b>Disclaimer of Consequential Damages.</b> IN NO EVENT WILL FRANK BE
      LIABLE TO CUSTOMER OR ANYONE ELSE FOR ANY SPECIAL, INDIRECT, INCIDENTAL,
      EXEMPLARY, OR CONSEQUENTIAL DAMAGES, INCLUDING WITHOUT LIMITATION LOST
      PROFITS, BUSINESS INTERRUPTION, OR LOSS OF INFORMATION, HOWEVER CAUSED AND
      ON ANY THEORY OF LIABILITY, AND WHETHER OR NOT FRANK HAS BEEN ADVISED OF
      THE POSSIBILITY OF SUCH DAMAGE.
      <br />
      <br />
      <b>Maximum Liability.</b> IN NO EVENT SHALL FRANK’S AGGREGATE LIABILITY
      ARISING OUT OF OR RELATED TO THIS TERMS OR THE LICENSES GRANTED HEREUNDER
      OR ANY TERMINATION OF ANY OF THE FOREGOING, EXCEED $1,000. THIS LIMITATION
      OF LIABILITY IS CUMULATIVE AND NOT PER INCIDENT.
      <br />
      <br />
      <b>Reasonable Allocation of Risk.</b> Customer understands and agrees that
      the limitations of liability set forth in this Section are a reasonable
      allocation of risk between Customer and Frank. Customer agrees that absent
      such allocation, Frank would not be able to offer the Frank Services. The
      limitations of liability provided in these Terms shall apply
      notwithstanding any failure of essential purpose of any limited remedy
      provided herein.
    </div>
    <div className={classes.subtitle}>Indemnity</div>
    <div className={classes.text}>
      You agree to indemnify and hold the Company, its subsidiaries and
      affiliates, if any, and their respective officers, agents, partners and
      employees, harmless from any loss, liability, claim or demand, including
      reasonable attorneys’ fees, made by any third party due to or arising out
      of Customer Information, use of the Frank Services in violation of this
      Agreement and/or arising from a breach of this Agreement and/or any breach
      of your representations and warranties set forth above and/or if any
      Customer Information that is available through the Frank Services causes
      the Company to be liable to a third party.
    </div>
    <div className={classes.subtitle}>Notices and Contact Information</div>
    <div className={classes.text}>
      Except as otherwise provided in this Agreement, the Company will give you
      any notices by posting them on the Website. Since notice of any material
      change to this Agreement will be posted to the Website for at least 30
      days, we encourage you to visit the Website at least that often. You also
      authorize the Company to send notices (including notice of subpoenas or
      other legal process, if any) via electronic mail to either your Frank
      Account or to the email address that we have on record for you. You must
      check the Website for notices, and you will be considered to have received
      a notice when it is made available to you by posting on the Website or
      when sent by the Company to your email address via electronic mail,
      whether or not received by you. The Company may provide notice to any
      e-mail or other address that you provide to us. You must keep your address
      current and any notice sent by the Company to the address that you have
      most recently provided is effective notice. You must send us any notice by
      mailing it to our address for Legal Notices which is: 2130 Prospect
      Street, Menlo Park, CA 94025.
    </div>
    <div className={classes.subtitle}>Other</div>
    <div className={classes.text}>
      If any provision of this Agreement is found to be unenforceable or
      invalid, that provision will be limited or eliminated to the minimum
      extent necessary so that this Agreement will otherwise remain in full
      force and effect and enforceable. This Agreement is not assignable,
      transferable or sublicensable by Customer except with Company’s prior
      written consent. Company may transfer and assign any of its rights and
      obligations under this Agreement without consent. This Agreement is the
      complete and exclusive statement of the mutual understanding of the
      parties and supersedes and cancels all previous written and oral
      agreements, communications and other understandings relating to the
      subject matter of this Agreement. This Agreement constitutes the entire
      agreement and understanding of the parties relating to the subject matter
      hereof. This Agreement shall be governed by the laws of the State of
      California without regard to its conflict of laws provisions.
    </div>
  </StepLayout>
)

export default compose(
  reconnect(null, {
    onNext: ACTIONS.acceptTerms,
  }),
  injectStyles(styles)
)(Terms)
